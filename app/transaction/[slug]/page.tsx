"use client"

import "@/app/register/style.css"
import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {Ewallet, GetTransactionResponse, OverTheCounter, QRCode, VirtualAccount} from "@/types/GetTransactionResponse";
import Navbar from "@/app/components/navbar";
import Error from "next/error";
import TransactionDetails from "@/app/transaction/components/TransactionDetails";
import PaymentDetails from "@/app/transaction/components/PaymentDetails";
import Footer from "@/app/components/footer";

interface Params {
  params: {
    slug: string
  }
}

const Transaction = ({params}: Params) => {
  const [isError, setIsError] = useState<boolean>(false)
  const [errorCode, setErrorCode] = useState<number>(0)
  const [paymentType, setPaymentType] = useState<Ewallet | VirtualAccount | QRCode | OverTheCounter>()
  const [transaction, setTransaction] = useState<GetTransactionResponse>()

  const getTransaction = async (id: string) => {
    const baseUrl: string = "http://localhost:8000/api"
    try {
      const {data} = await axios.get(`${baseUrl}/transaction/${id}`);

      const response: GetTransactionResponse = await data

      setTransaction(response)

      if (response.data.payment.ewallet !== null)
        setPaymentType(response.data.payment.ewallet)
      if (response.data.payment.virtual_account !== null)
        setPaymentType(response.data.payment.virtual_account)
      if (response.data.payment.qr_code !== null)
        setPaymentType(response.data.payment.qr_code)
      if (response.data.payment.over_the_counter !== null)
        setPaymentType(response.data.payment.over_the_counter)
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsError(!err?.response?.data?.success)
        setErrorCode(err?.response?.data.status_code)
      }
    }
  }

  useEffect(() => {
    getTransaction(params.slug)
  }, [isError]);


  return isError ?
      <>
        <Navbar/>
        <Error statusCode={errorCode}/>
      </>
      :
      <>
        <Navbar/>
        <main id={"main"} className={"flex flex-col gap-12 w-full max-w-[1220px] mx-auto text-body-text mt-10"}>
          <div className={"flex flex-col xl:flex-row gap-6 m-auto mx-10 xl:m-0"}>
            <PaymentDetails transaction={transaction} />
            <TransactionDetails transaction={transaction?.data?.transaction}/>
          </div>
        </main>
        <Footer />
      </>
}

export default Transaction