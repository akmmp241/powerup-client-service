export interface GetBannersResponse {
  success: boolean
  status_code: number
  message: string
  data: [
    {
      image: string
      description: string
    }
  ]
}