interface GetChargeResponse {
  success: boolean
  status_code: number
  message: string
  data: {
    transaction_id: string
    product_name: string
    destination: string
    server_id: string
    payment_method: string
    total: number,
    status: string
    created_at: string
    updated_at: string
  }
}