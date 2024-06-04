"use server"

import axios from "axios";
import {GetPaymentMethodsResponse} from "@/types/GetPaymentMethodsResponse";

const fetchPaymentsMethods = async () => {
  const baseUrl: undefined | string = process.env.API_URL
  try {
    const {data} = await axios.get(`${baseUrl}/payments/methods`);

    const response: GetPaymentMethodsResponse = await data

    return response
  } catch (err) {
    throw err
  }
}

export default fetchPaymentsMethods