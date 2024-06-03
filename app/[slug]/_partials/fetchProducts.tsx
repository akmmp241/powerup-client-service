"use server"

import axios from "axios";
import {GetTypesResponse} from "@/types/GetTypesResponse";
import {GetProductResponse} from "@/types/GetProductResponse";

const fetchProducts = async (id: number|undefined) => {
  const baseUrl: undefined | string = process.env.API_URL
  try {
    const {data} = await axios.get(`${baseUrl}/products?type_id=${id}`);

    const response: GetProductResponse = await data

    return response
  } catch (err) {
    throw err
  }
}

export default fetchProducts