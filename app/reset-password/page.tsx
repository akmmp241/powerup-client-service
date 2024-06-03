"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useState} from "react";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import FormHeader from "@/app/register/components/formHeader";
import AuthMessage from "@/app/register/components/authMessage";
import Form from "@/app/reset-password/components/form";
import reset from "@/app/reset-password/partials/reset";
import GetId from "@/app/reset-password/partials/getId";

const ResetPassword = () => {
  const router = useRouter()
  const params = useSearchParams()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [message, setMessage] = useState<string>("")
  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>()
  const [statusCode, setStatusCode] = useState<number>(200)
  const token: string|null = params.get('reset_password_token')

  const resetHandler = async (formData: FormData, id: string|undefined) => {
    const res = await reset(formData, id)

    res.isSuccess ? router.push('/') : router.refresh()

    setIsSuccess(res.isSuccess)
    setMessage(res.message)
    setErrorMessages(res.errors)
    setStatusCode(res.statusCode)
  }

  const formHandler = async (formData: FormData) => {

    const resId = await GetId(token)

    setIsSuccess(resId.isSuccess)
    setMessage(resId.message)
    setStatusCode(resId.statusCode)

    if (resId.isSuccess) {
      await resetHandler(formData, resId.id)
    }
  }

  return (
      <>
        <FormHeader message={"Reset Your Password"} />

        {!isSuccess && statusCode === 404 ? <AuthMessage message={message}/> : null}

        <Suspense fallback={<p>Sabar bang loading...</p>}>
          <Form formHandler={formHandler} errorMessages={errorMessages}/>
        </Suspense>
      </>
  )
}

export default ResetPassword