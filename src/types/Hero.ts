export interface Hero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpower: string;
  catch_phrase: string;
  images: { id: number; image_url: string }[];
};