"use server"

import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";

const getOperators = async (id: number, page: number) => {

  try {
    const baseUrl = process.env.API_URL;
    const {data} = await axios.get(`${baseUrl}/products/operators`, {
      params: {
        category_id: id,
        page: page
      }
    })

    const statusCode: number = data.status_code;
    const isSuccess: boolean = data.success;
    const message: string = data.message;

    return {
      message: message,
      statusCode: statusCode,
      isSuccess: isSuccess,
      data: await data.data,
      totalPage: await data.total_page,
      perPage: await data.per_page,
      currentPage: await data.current_page
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const statusCode: number = error.response?.data.status_code;
      const isSuccess: boolean = error.response?.data.success;
      const message: string = error.response?.data.message;
      const errors: ErrorMessagesType = error.response?.data?.errors;

      return {
        isSuccess,
        message,
        errors,
        statusCode
      };
    }

    throw error
  }
}

export default getOperators