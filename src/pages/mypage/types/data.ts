export interface Scrap {
  castId: string;
  castTitle: string;
  imageUrl: string;
  troupeId: number;
  troupeName: string;
  isBookmarked: boolean;
  practiceAddress: string;
  dateExpired: string;
  dday: number;
}

export interface Recruit {
  recruitId: string;
  thumbnail: string;
  recruitTitle: string;
  artworkName: string;
  troupeName: string;
  practiceLocation: string;
}
