import { HeroCreate } from "@/types/HeroCreate";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const heroGet = async () => {
  try {
    const response = await apiClient.get("");
    return response.data;
  } catch (error) {
    console.error("get Eroro");
    throw error;
  }
};

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
    const response = await apiClient.post('', formData);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const heroDelete = async (id: number) => {
  try {
    const response = await apiClient.delete(`${id}`);
    return response.data;
  } catch (err) {
    console.error("Failer to dalete hero", err);
  }
};

export const heroUpdate = async (id: number, HeroData: HeroCreate) => {
  try {
    const response = await apiClient.put(`${id}`, HeroData);
    return response.data;
  } catch (err) {
    console.error("Failed to update hero", err);
    throw err;
  }
};
