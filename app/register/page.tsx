"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import AuthMessage from "@/app/register/components/authMessage";
import register from "@/app/register/partials/register";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import FormHeader from "@/app/register/components/formHeader";
import Form from "@/app/register/components/form";
import FormFooter from "@/app/register/components/formFooter";

const Register = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<ErrorMessagesType>();
  const [statusCode, setStatusCode] = useState<number>(200);

  const formHandler = async (formData: FormData) => {
    const res = await register(formData)

    res.isSuccess ? router.push('/') : setIsSuccess(res.isSuccess)

    setMessage(res.message)
    setStatusCode(res.statusCode)
    setErrorMessages(res.errors)
    router.refresh()
  }

  return (
      <>
        <FormHeader message={"Daftar Sekarang"}/>

        {!isSuccess && statusCode === 406 ? <AuthMessage message={message}/> : null}

        <Form formHandler={formHandler}
              errorMessages={errorMessages}/>

        <FormFooter
            message={"Sudah punya akun?"}
            uri={"/login"}
            link={"Masuk"}/>
      </>
  )
}

export default Register