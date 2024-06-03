export interface GetOperatorResponse {
    success: boolean,
    status_code: number
    message: string,
    data: {
        id: number,
        ref_id: number,
        category_id: number,
        category_name: "Topup Game",
        name: string,
        slug: string,
        image: string
    }
}