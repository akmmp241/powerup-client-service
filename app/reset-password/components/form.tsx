"use client"

import {ErrorMessagesType} from "@/types/errorMessages.type";
import {Label} from "@/components/ui/label";
import {PasswordInput} from "@/components/ui/inputPassword";
import ErrorMessage from "@/app/register/components/errorMessage";
import {Button} from "@/components/ui/button";
import GetId from "@/app/reset-password/partials/getId";
import reset from "@/app/reset-password/partials/reset";
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import AuthMessage from "@/app/register/components/authMessage";

const Form = () => {
  const router = useRouter()
  const params = useSearchParams()
  const [isSuccess, setIsSuccess] = useState<boolean>()
  const [message, setMessage] = useState<string>("")
  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>()
  const [statusCode, setStatusCode] = useState<number>(200)
  const token: string | null = params.get('reset_password_token')

  const resetHandler = async (formData: FormData, id: string | undefined) => {
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

  const inputClass = "w-full sm:w-[320px] lg:w-[400px] py-2 lg:py-3 pl-4 bg-transparent outline-1 outline outline-primary focus-visible:outline-blue rounded-lg text-sm"
  const errInputClass = inputClass.replace('outline-primary', 'outline-red-500')

  return (
      <>
        {!isSuccess && statusCode === 404 ? <AuthMessage message={message}/> : null}

        <div>
          <form action={formHandler} className={"flex flex-col gap-6 text-primary"}>
            <div className={"flex flex-col gap-1.5"}>
              <Label className={!errorMessages?.password ? "" : "text-red-500"}
                     htmlFor="password">Kata sandi</Label>
              <PasswordInput
                  className={!errorMessages?.password ? inputClass : errInputClass}
                  name={"password"}
                  required
                  placeholder={"Sandi Anda di sini"}
              />
              {!errorMessages?.password ? null : errorMessages.password?.map((prop, id) => (
                  <ErrorMessage key={id} message={prop}/>
              ))}
            </div>
            <div className={"flex flex-col gap-1.5"}>
              <Label className={"text-sm"} htmlFor="password_confirmation">Konfirmasi Sandi</Label>
              <PasswordInput
                  className={inputClass}
                  name={"password_confirmation"}
                  required
                  placeholder={"Sandi Anda di sini"}
              />
            </div>
            <div>
              <Button
                  type={"submit"}
                  size={"lg"}
                  className={"w-full bg-blue rounded-lg mt-2 font-bold"}>
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </>
  )
}

export default Form