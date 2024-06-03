"use client"

import {Button} from "@/components/ui/button";
import Image from "next/image";
import GoogleIcon from "./assets/Google-logo.png"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {ErrorMessagesType} from "@/types/errorMessages.type";
import AuthMessage from "@/app/register/components/authMessage";
import Form from "@/app/login/components/form";
import login from "@/app/login/partials/login";
import FormHeader from "@/app/register/components/formHeader";
import FormFooter from "@/app/register/components/formFooter";

const Login = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<ErrorMessagesType>();
  const [statusCode, setStatusCode] = useState<number>(200);

  const formHandler = async (formData: FormData) => {
    const res = await login(formData)
    const isLoginSuccess = res.isSuccess
    const error_message = res?.errors
    const message = res.message
    const status_code = res.statusCode

    isLoginSuccess ? router.push('/') : setIsSuccess(isLoginSuccess)

    setMessage(message)
    setErrorMessage(error_message)
    setStatusCode(status_code)
    router.refresh()
  }

  return (
      <>
        <FormHeader message={"Masuk ke Akun Kamu"}/>

        {!isSuccess && statusCode === 406 ? <AuthMessage message={message}/> : null}

        <Form formHandler={formHandler} errorMessage={errorMessage}/>

        {/*Login Google*/}
        <div className={"flex flex-col gap-6"}>
          <div className={"flex flex-row justify-between items-center"}>
            <span className={"w-1/2 h-[1px] bg-primary border-t border-primary"}></span> {/* <-- garis */}
            <span className={"w-full mx-4 text-center text-sm"}>Atau lanjutkan dengan</span>
            <span className={"w-1/2 h-[1px] bg-primary border-t border-primary"}></span> {/* <-- garis */}
          </div>
          <div>
            <Button
                className={"gap-2.5 w-full sm:w-[320px] lg:w-[400px] py-3 lg:py-4 pl-4 bg-transparent outline-1 outline outline-primary active:bg-primary active:text-black"}>
              <Image
                  src={GoogleIcon}
                  alt={"sign in with Google"}
                  width={20}
                  height={20}
              />
              Masuk dengan Google
            </Button>
          </div>
        </div>

        <FormFooter
            message={"Belum memiliki akun?"}
            uri={"/register"}
            link={"Daftar Sekarang"}/>
      </>
  )
}

export default Login