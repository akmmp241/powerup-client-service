"use server"

import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import {redirect, RedirectType} from "next/navigation";

const reset = async (formData: FormData, id: string | undefined) => {
  const baseUrl = process.env.API_URL
  const {password, password_confirmation} = Object.fromEntries(formData.entries())

  try {
    const {data} = await axios.patch(`${baseUrl}/auth/reset-password`, {
      id: id,
      password: password,
      password_confirmation: password_confirmation
    });

    const statusCode: number = data.status_code;
    const isSuccess: boolean = data.success;
    const message: string = data.message;

    return redirect('/', RedirectType.push)
  } catch (error) {
    if (error instanceof AxiosError) {
      const statusCode: number = error.response?.data.status_code;
      const isSuccess: boolean = error.response?.data.success;
      let message: string = error.response?.data.message;
      const errors: ErrorMessagesType = error.response?.data?.errors;

      if (statusCode === 404) {
        message = "Link tidak valid"
      }

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

export default reset