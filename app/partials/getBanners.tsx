"use server"

import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import {GetBannersResponse} from "@/types/GetBannersResponse";

const getBanners = async () => {
  try {
    const baseUrl = process.env.API_URL;
    const {data} = await axios.get(`${baseUrl}/products/home/banners`)

    const response: GetBannersResponse = data

    return response
  } catch (error) {
    throw error
  }
}

export default getBanners