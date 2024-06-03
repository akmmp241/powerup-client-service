"use server"

import axios, {AxiosError} from "axios";
import {cookies} from "next/headers";
import {ErrorMessagesType} from "@/types/errorMessages.type";

const Login = async (formData: FormData) => {
  const {email, password} = Object.fromEntries(formData.entries());

  try {
    const baseUrl = process.env.API_URL
    const {data} = await axios.post(`${baseUrl}/auth/login`, {
      email: email,
      password: password
    });

    cookies().set("POWERUP-API-KEY", data.data.token, {
      maxAge: 3600
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

export default Login