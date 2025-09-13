import { HeroCreate } from "@/type/HeroCreate";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/superheroes";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const heroPost = async (heroData: HeroCreate, file?: File | null) => {
//   try {
//     const formData = new FormData();
//     formData.append("nickname", heroData.nickname);
//     formData.append("real_name", heroData.real_name);
//     formData.append("origin_description", heroData.origin_description);
//     formData.append("superpawer", heroData.superpower);
//     formData.append("catch_pharase", heroData.catch_phrase);
//     if (file) {
//       formData.append('image', file);
//     }
//     const response = await axios.post(BASE_URL, formData, {
//       headers: {}
//     });
//     console.log("response headers", response.headers);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
export const heroPost = async (heroData: HeroCreate, file?: File | null) => {
  try {
    const formData = new FormData();
    formData.append("nickname", heroData.nickname);
    formData.append("real_name", heroData.real_name);
    formData.append("origin_description", heroData.origin_description);
    formData.append("superpower", heroData.superpower);
    formData.append("catch_phrase", heroData.catch_phrase);
    if (file) {
      formData.append("image", file);
    }
    const response = await axios.post(BASE_URL, formData, {
      headers: {
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
