export interface GetProductResponse {
    success: boolean
    status_code: number
    message: string
    data: [
        {
            ref_id: number
            type_id: number
            category_name: string
            type_name: string
            code: string
            name: string
            price: number
            description: string
            status: number
        }
    ]
}