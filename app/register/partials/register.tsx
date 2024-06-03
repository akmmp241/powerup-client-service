"use server"

import {cookies} from "next/headers";
import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";

const register = async (formData: FormData) => {
  const {email, name, password, password_confirmation} = Object.fromEntries(formData.entries())

  try {
    const baseUrl = `${process.env.API_URL}`

    const {data} = await axios.post(`${baseUrl}/auth/register`, {
      email: email,
      name: name,
      password: password,
      password_confirmation: password_confirmation
    })

    cookies().set("POWERUP-API-KEY", data.data.token, {
      maxAge: 3600
    })

    return {
      message: data.message,
      statusCode: data.status_code,
      isSuccess: data.success
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const status_code: string = error.response?.data.status_code
      const isSuccess: boolean = error.response?.data.success;
      const message: string = error.response?.data.message;
      const errorMessages: ErrorMessagesType = error.response?.data?.errors;

      return {
        isSuccess,
        message,
        errors: errorMessages,
        status_code
      };
    }
    throw error
  }
}

export default register