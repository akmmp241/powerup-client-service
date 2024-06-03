export interface GetPromosResponse {
  success: boolean
  status_code: number
  message: string
  data: [
    {
      id: number
      product_id: number
      product_name: string
      title: string
      description: string
      percentage: number
      product_url: string
      product_price: number
      final_price: number
      image_url: string
    }
  ]
}