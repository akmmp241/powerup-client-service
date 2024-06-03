interface Ewallet {
  channel_code: string
  channel_properties: {
    success_return_url: string
  }
  account: {
    name: string | null
    account_details: any | null
    balance: number | null
    point_balance: number | null
  }
}

interface VirtualAccount {
  amount: number
  currency: string
  channel_code: string
  channel_properties: {
    customer_name: string
    virtual_account_number: number
    expires_at: string
  }
}

interface QRCode {
  amount: number
  currency: string
  channel_code: string
  channel_properties: {
    qr_string: string
    expires_at: string
  }
}

interface OverTheCounter {
  amount: number
  currency: string
  channel_code: string
  channel_properties: {
    payment_code: string
    customer_name: string
    expires_at: string
  }
}

interface PaymentActions {
  action: string
  url: string
  url_type: string
  method: string
  qr_code: string | null
}

interface GetTransactionResponse {
  success: boolean
  status_code: number
  message: string
  data: {
    transaction: {
      id: string
      user_id: number | null
      email: string
      product: {
        code: string
        name: string
        operator_name: string
        operator_image: string
      }
      destination: string
      server_id: string
      payment_method: string
      total: number
      status: string
      paid_at: string | null
      failure_code: string | null
      created_at: string
      updated_at: string
    }
    payment: {
      ewallet: Ewallet | null
      virtual_account: VirtualAccount | null
      qr_code: QRCode | null
      over_the_counter: OverTheCounter | null
    }
    actions: PaymentActions|null
  }
}

export type {
  Ewallet,
  VirtualAccount,
  QRCode,
  OverTheCounter,
  PaymentActions,
  GetTransactionResponse
}