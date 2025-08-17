"use server"

import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";

const getOperators = async (id: number) => {

    try {
        const baseUrl = process.env.API_URL;
        const {data} = await axios.get(`https://api.tokovoucher.net/member/produk/operator/list?member_code=M240120TKCM7128SX&signature=3465c276d492fcedd40ac5bab00482d7`, {
            params: {
                id: id
            }
        })

        const statusCode: number = data.status_code;
        const isSuccess: boolean = data.success;
        const message: string = data.message;

        const sortedOperator: any = [...data.data].sort((a, b) => a.id - b.id);

        return {
            message: message,
            statusCode: statusCode,
            isSuccess: isSuccess,
            data: sortedOperator
        }
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

export default getOperators