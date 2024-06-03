export interface GetPaymentMethodsResponse {
    success: boolean
    status_code: number
    message: string
    data: [
        {
            name: string
            code: string
            channel_list: [
                {
                    id: number
                    type: string
                    channel_code: string
                    name: string
                    charge: number
                    icon: string|null
                }
            ]
        }
    ]
}