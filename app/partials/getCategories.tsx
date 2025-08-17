"use server"

import axios, {AxiosError} from "axios";
import {ErrorMessagesType} from "@/types/errorMessages.type";

interface GlobalRes<T> {
    status: number;
    rc: number;
    message: string;
    data: T | null;
}

interface ErrRes {
    status: number;
    rc: number;
    error_msg: string;
}

interface categoryInterface {
    id: number;
    refId: number;
    name: string;
}

const getCategories = async () => {
    try {
        const baseUrl = process.env.API_URL;
        const {data} = await axios.get(`https://api.tokovoucher.net/member/produk/category/list?member_code=M240120TKCM7128SX&signature=3465c276d492fcedd40ac5bab00482d7`)

        const statusCode: number = data.status_code;
        const isSuccess: boolean = data.success;
        const message: string = data.message;
        const errors: null = null;

        const sortedCategories: any = [...data.data].sort((a, b) => a.id - b.id);

        return {
            message: message,
            statusCode: statusCode,
            isSuccess: isSuccess,
            errors: errors,
            data: sortedCategories
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

export default getCategories