"use client"

import TransactionStatus from "@/app/transaction/components/TransactionStatus";

interface TransactionDetails {
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

const TransactionDetails = ({transaction}: { transaction: TransactionDetails | undefined }) => {
  return (
      <div className={"w-full xl:min-w-[30%] xl:max-w-[40%] bg-[#191D24] rounded-[8px]"}>
        <div className={"px-5 py-2 rounded-t-[8px] bg-secondary"}>
          <h2 className={"text-xl font-bold"}>Detail Transaksi</h2>
        </div>
        <div className={"px-5 py-4"}>
          <ul className={"flex flex-col gap-4"}>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>ID Transaksi</p>
              <p className={"max-w-[60%] text-xs overflow-scroll"}>{transaction?.id}</p>
            </li>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>Tujuan</p>
              <p className={"max-w-[50%] overflow-scroll font-bold"}>{transaction?.destination}</p>
            </li>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>Server</p>
              <p className={"max-w-[50%] overflow-scroll font-bold"}>{transaction?.server_id}</p>
            </li>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>Metode Pembayaran</p>
              <p className={"max-w-[50%] overflow-scroll"}>{transaction?.payment_method}</p>
            </li>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>Email</p>
              <p className={"max-w-[60%] overflow-scroll"}>{transaction?.email}</p>
            </li>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>Total Tagihan</p>
              {/*@ts-ignore*/}
              <p className={"max-w-[50%] overflow-scroll"}>{transaction?.total}</p>
            </li>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>Status</p>
              {/*@ts-ignore*/}
              <TransactionStatus status={transaction?.status}/>
            </li>
            <li className={"flex flex-row justify-between items-center"}>
              <p className={"text-inactive-text"}>Transaksi Dibuat</p>
              <p className={"max-w-[50%] overflow-scroll"}>{transaction?.created_at}</p>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default TransactionDetails