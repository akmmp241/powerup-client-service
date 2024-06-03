"use server"

import axios, {AxiosError} from "axios";

const GetId = async (token: string|null) => {
  const baseUrl = process.env.API_URL

  try {
    const {data} = await axios.post(`${baseUrl}/auth/reset-password`, {
      token: token
    });

    const statusCode: number = data.status_code;
    const isSuccess: boolean = data.success;
    const message: string = data.message;
    const id: string = data.data.id

    return {
      id,
      message,
      statusCode,
      isSuccess
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const statusCode: number = error.response?.data.status_code;
      const isSuccess: boolean = error.response?.data.success;
      const message: string = error.response?.data.message;

      return {
        isSuccess,
        message,
        statusCode
      };
    }

    throw error
  }
}

export default GetId