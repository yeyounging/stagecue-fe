import styled from "styled-components";
import ChevronRightSVG from "@assets/icons/chevron_right.svg?react";
import BookmarkSVG from "@assets/icons/bookmark.svg?react";
import BookmarkFilledSVG from "@assets/icons/bookmark_filled.svg?react";
import { useEffect, useState } from "react";
import BasicInfo from "../components/basicInfo";
import LocationInfo from "../components/locationInfo";
import PracticeInfo from "../components/practiceInfo";
import Application from "../components/application";
import {
  requestCastDetail,
  requestDeleteScrapCast,
  requestScrapCast,
} from "@/api/cast";
import { useNavigate, useParams } from "react-router-dom";
import PostImageSlide from "../components/slide";
import useSessionStore from "@/store/session";

interface RecruitDetail {
  recruitTitle: string;
  introduce: string;
  troupeName: string;
  troupeLogoImage: string;
  recruitImages: string[];
  monthlyFee: number;
  isApplied: boolean;
  practice: {
    dateStart: string;
    dateEnd: string;
    address: string;
    addressDetail: string;
    daysOfWeek: number;
    lat: number;
    lng: number;
  };
  stage: {
    dateStart: string;
    dateEnd: string;
    address: string;
    addressDetail: string;
    lat: number;
    lng: number;
  };
  recruitingParts: string[];
  isScrapping: boolean;
}

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recruitDetail, setRecruitDetail] = useState<RecruitDetail>();
  const [selectedTab, setSelectedTab] = useState("공연 기본 정보");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { isLoggined } = useSessionStore();

  const handleTabClick = (option: string) => {
    setSelectedTab(option);
  };

  const handleBookmarkClick = async () => {
    if (isBookmarked) {
      const res = await requestDeleteScrapCast(id!);
      console.log(res);
      setIsBookmarked(false);
    } else {
      await requestScrapCast(id!);
      setIsBookmarked(true);
    }
  };

  const getCastDetail = async () => {
    if (id) {
      const cast = await requestCastDetail(id);

      setRecruitDetail(cast);

      if (cast.isScrapping) {
        setIsBookmarked(true);
      }
    }
  };

  const handleTroupeNameClick = () => {
    navigate(`/troupe/${recruitDetail?.troupeName}`);
  };

  useEffect(() => {
    getCastDetail();
  }, []);

  return (
    <DetailContainer>
      <ContentWrapper>
        <Header>
          <TitleWrapper>
            <DdayWrapper>
              {/* TODO: 디데이 바인딩 */}
              <Dday>D-12</Dday>
              {isLoggined && (
                <BookmarkWrapper onClick={handleBookmarkClick}>
                  {isBookmarked ? <BookmarkFilledSVG /> : <BookmarkSVG />}
                </BookmarkWrapper>
              )}
            </DdayWrapper>
            <Title>{recruitDetail?.recruitTitle}</Title>
          </TitleWrapper>
          <Divider />
          <TroupeWrapper>
            <TroupeLogo
              src={`https://s3.stagecue.co.kr/stagecue${recruitDetail?.troupeLogoImage}`}
            />
            <TroupeName onClick={handleTroupeNameClick}>
              {recruitDetail?.troupeName}
              <IconWrapper>
                <ChevronRightSVG />
              </IconWrapper>
            </TroupeName>
          </TroupeWrapper>
          {recruitDetail && (
            <PostImageSlide images={recruitDetail?.recruitImages} />
          )}
        </Header>
        <Content>
          <ContentTab>
            <Option
              onClick={() => handleTabClick("공연 기본 정보")}
              $isSelected={selectedTab === "공연 기본 정보"}
            >
              공연 기본 정보
              {selectedTab === "공연 기본 정보" && <SelectedBorder />}
            </Option>
            <Option
              onClick={() => handleTabClick("공연 위치 정보")}
              $isSelected={selectedTab === "공연 위치 정보"}
            >
              공연 위치 정보
              {selectedTab === "공연 위치 정보" && <SelectedBorder />}
            </Option>
            <Option
              onClick={() => handleTabClick("연습 장소 정보")}
              $isSelected={selectedTab === "연습 장소 정보"}
            >
              연습 장소 정보
              {selectedTab === "연습 장소 정보" && <SelectedBorder />}
            </Option>
          </ContentTab>
          {recruitDetail && (
            <ContentBody>
              {selectedTab === "공연 기본 정보" && (
                <BasicInfo
                  introduce={recruitDetail.introduce}
                  start={recruitDetail.stage.dateStart}
                  end={recruitDetail.stage.dateEnd}
                  monthlyFee={recruitDetail.monthlyFee}
                  recruitingParts={recruitDetail.recruitingParts}
                />
              )}
              {selectedTab === "공연 위치 정보" && (
                <LocationInfo
                  address={recruitDetail.stage.address}
                  addressDetail={recruitDetail.stage.addressDetail}
                  lat={recruitDetail.stage.lat}
                  lng={recruitDetail.stage.lng}
                />
              )}
              {selectedTab === "연습 장소 정보" && (
                <PracticeInfo
                  start={recruitDetail.practice.dateStart}
                  end={recruitDetail.practice.dateEnd}
                  address={recruitDetail.practice.address}
                  addressDetail={recruitDetail.practice.addressDetail}
                  daysOfWeek={recruitDetail.practice.daysOfWeek}
                  lat={recruitDetail.practice.lat}
                  lng={recruitDetail.practice.lng}
                />
              )}
            </ContentBody>
          )}
        </Content>
      </ContentWrapper>
      {recruitDetail && isLoggined && (
        <Application recruitId={id!} isApplied={recruitDetail?.isApplied} />
      )}
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  margin-top: 60px;
  margin-bottom: 100px;
`;

const ContentWrapper = styled.div`
  width: 689px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Content = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Dday = styled.div`
  width: 50px;
  height: 26px;
  background-color: #000000;
  border-radius: 4px;
  font-weight: var(--font-semibold);
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2px 6px;
  font-size: 15px;
`;

const Title = styled.div`
  height: 32px;
  font-size: 24px;
  letter-spacing: -2.3%;
  line-height: 133.4%;
  font-weight: var(--font-bold);
`;

const TroupeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TroupeLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const TroupeName = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const Divider = styled.div`
  width: 689px;
  height: 1px;
  background-color: #f4f4f5;
`;

const ContentTab = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #f4f4f5;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  min-width: 118px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isSelected }) => ($isSelected ? "#171719" : "#999ba2")};
  cursor: pointer;
  position: relative;
`;

const SelectedBorder = styled.div`
  position: absolute;
  height: 4px;
  width: 118px;
  background-color: #b82824;
  bottom: -2px;
`;

const ContentBody = styled.div`
  width: 689px;
`;

const BookmarkWrapper = styled.div`
  cursor: pointer;
`;
