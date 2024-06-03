"use server"

import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";

const send = async (formData: FormData) => {
  const {email} = Object.fromEntries(formData.entries())

  try {
    const baseUrl = process.env.API_URL
    const {data} = await axios.post(`${baseUrl}/auth/forget-password`, {
      email: email
    });

    const statusCode: number = data.status_code;
    const isSuccess: boolean = data.success;
    const message: string = data.message;

    return {
      message,
      statusCode,
      isSuccess
    };
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

export default send