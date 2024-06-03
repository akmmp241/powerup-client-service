"use server"

import axios from "axios";
import {GetOperatorResponse} from "@/types/GetOperatorResponse";

const fetchSingleOperator = async (slug: string) => {
  const baseUrl: undefined | string = process.env.API_URL
  try {
    const {data} = await axios.get(`${baseUrl}/products/operators/${slug}`);

    const response: GetOperatorResponse = await data

    return response
  } catch (err) {
    throw err
  }
}

export default fetchSingleOperator