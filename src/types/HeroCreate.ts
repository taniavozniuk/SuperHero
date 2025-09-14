export interface HeroCreate {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpower: string;
  catch_phrase: string;
  images: { image_url: string }[];
}
