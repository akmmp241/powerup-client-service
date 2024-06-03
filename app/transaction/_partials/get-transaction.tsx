"use server"

import axios from "axios";
import {GetTransactionResponse} from "@/types/GetTransactionResponse";

const fetchTransaction = async (id: string) => {
  const baseUrl: undefined | string = process.env.API_URL
  try {
    const {data} = await axios.get(`${baseUrl}/transaction/${id}`);

    const response: GetTransactionResponse = data

    return response
  } catch (err) {
    throw err
  }
}

export default fetchTransaction