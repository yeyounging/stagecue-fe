import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { requestCastsStatus, requestScraps } from "@/api/users";
import {
  requestCasts,
  requestDeleteScrapCast,
  requestScrapCast,
} from "@/api/cast";
import dayjs from "dayjs";
import { Scrap } from "../types/data";

export const useMystageData = () => {
  const queryClient = useQueryClient();

  const { data: recruitsStatus } = useQuery({
    queryKey: ["recruitsStatus"],
    queryFn: requestCastsStatus,
    staleTime: 1000 * 60 * 5,
  });

  const { data: popularRecruits } = useQuery({
    queryKey: ["popularRecruits"],
    queryFn: () =>
      requestCasts({
        limit: "4",
        offset: "0",
        orderBy: "newest",
      }),
    staleTime: 1000 * 60 * 5,
    select: (data) => data.recruit,
  });

  const { data: scraps = [] } = useQuery<Scrap[]>({
    queryKey: ["scrappedCasts"],
    queryFn: async () => {
      const { casts } = await requestScraps({ limit: 3, offset: 0 });
      const today = dayjs();
      return casts.map((scrap: Scrap) => ({
        ...scrap,
        isBookmarked: true,
        dday: dayjs(scrap.dateExpired).diff(today, "day"),
      }));
    },
    staleTime: 1000 * 60 * 5,
  });

  const bookmarkMutation = useMutation({
    mutationFn: async (id: string) => {
      const isBookmarked = scraps.find(
        (cast: Scrap) => cast.castId === id
      )?.isBookmarked;

      if (isBookmarked) {
        await requestDeleteScrapCast(id);
      } else {
        await requestScrapCast(id);
      }

      return !isBookmarked;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["scrappedCasts"] });

      queryClient.setQueryData(["scrappedCasts"], (oldScraps: Scrap[] = []) =>
        oldScraps.map((scrap) =>
          scrap.castId === id
            ? { ...scrap, isBookmarked: !scrap.isBookmarked }
            : scrap
        )
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["scrappedCasts"] });
    },
  });

  const handleBookmarkClick = (id: string) => bookmarkMutation.mutate(id);

  return {
    recruitsStatus,
    popularRecruits,
    scraps,
    handleBookmarkClick,
  };
};
