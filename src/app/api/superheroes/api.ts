import { HeroCreate } from "@/type/HeroCreate";
import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/superheroes'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const heroPost = async (heroData: HeroCreate) => {
  try {
    const response = await apiClient.post('', heroData);
    console.log('response headers', response.headers);
    return response.data
  } catch (err) {
    console.log(err);
    throw err
  }
}