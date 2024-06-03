"use server"

import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import {GetPopularsResponse} from "@/types/GetPopularsResponse";

const getPopular = async () => {
  try {
    const baseUrl = process.env.API_URL;
    const {data} = await axios.get(`${baseUrl}/products/populars`)

    const response: GetPopularsResponse = data

    return response
  } catch (error) {
    throw error
  }
}

export default getPopular