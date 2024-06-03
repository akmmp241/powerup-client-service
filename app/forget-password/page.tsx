"use client"

import FormHeader from "@/app/register/components/formHeader";
import {useRouter} from "next/navigation";
import {Suspense, useState} from "react";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import send from "@/app/forget-password/partials/send";
import AuthMessage from "@/app/register/components/authMessage";
import Form from "@/app/forget-password/components/form";

const ForgetPassword = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [message, setMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>();
  const [statusCode, setStatusCode] = useState<number>(200);

  const formHandler = async (formData: FormData) => {
    const res = await send(formData)

    setIsSuccess(res.isSuccess)
    setMessage(res.message)
    setErrorMessages(res.errors)
    setStatusCode(res.statusCode)
    router.refresh()
  }

  return (
      <>
        <FormHeader message={"Forget Password"} />

        <Suspense fallback={<p>Loading bang...</p>}>
          {!isSuccess ?
              <>
                {!isSuccess && statusCode === 429 ? <AuthMessage message={message}/> : null}
                <Form formHandler={formHandler} errorMessages={errorMessages} />
              </>
              :
              <div>
                <div className={"p-5 bg-[#198754] rounded-md"}>
                  Tautan reset kata sandi telah dikirim ke Email Anda.
                  <br/>Silahkan periksa kotak masuk Email.
                </div>
              </div>
          }
        </Suspense>
      </>
  )
}

export default ForgetPassword