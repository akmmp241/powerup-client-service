"use server"

import axios from "axios";
import {GetTypesResponse} from "@/types/GetTypesResponse";

const fetchTypes = async (id: number|undefined) => {
  const baseUrl: undefined | string = process.env.API_URL
  try {
    const {data} = await axios.get(`${baseUrl}/products/types?operator_id=${id}`);

    const response: GetTypesResponse = await data

    return response
  } catch (err) {
    throw err
  }
}

export default fetchTypes