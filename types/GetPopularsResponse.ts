export interface GetPopularsResponse {
  success: boolean
  status_code: number
  message: string
  data: [
    {
      id: number
      operator_id: number
      operator_name: string
      title: string
      image_url: string
      description: string
      link: string
    }
  ]
}