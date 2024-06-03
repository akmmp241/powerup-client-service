"use server"
import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import {GetPromosResponse} from "@/types/GetPromosResponse";

const getPromos = async () => {
  try {
    const baseUrl = process.env.API_URL;
    const {data} = await axios.get(`${baseUrl}/products/promos`)

    const response: GetPromosResponse = data

    return response

  } catch (error) {
    throw error
  }
}

export default getPromos