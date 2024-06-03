import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";

const getPromos = async () => {
  try {
    const baseUrl = process.env.API_URL;
    const {data} = await axios.get(`${baseUrl}/products/promos`)

    const statusCode: number = data.status_code;
    const isSuccess: boolean = data.success;
    const message: string = data.message;
    const errors: null = null;

    return {
      message: message,
      statusCode: statusCode,
      isSuccess: isSuccess,
      errors: errors,
      data: data
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

export default getPromos