import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image";
import GoogleIcon from "./assets/Google-logo.png"
import {PasswordInput} from "@/components/ui/inputPassword";

export default function Login() {
  const inputClass = "w-full sm:w-[320px] lg:w-[400px] py-2 lg:py-3 pl-4 bg-transparent outline-1 outline outline-primary focus-visible:outline-blue rounded-lg text-sm"

  return (
      <>
        <div className={"text-primary text-3xl lg:text-4xl font-bold"}>
          <h1>Masuk ke Akun Kamu</h1>
        </div>
        <div>
          <form className={"flex flex-col gap-6 text-primary"}>
            <div className={"flex flex-col gap-1.5"}>
              <Label className={"text-sm"} htmlFor="Email">Email</Label>
              <Input
                  className={inputClass}
                  type={"text"}
                  placeholder={"Email Anda di sini"}
              />
            </div>
            <div className={"flex flex-col gap-1.5"}>
              <div className={"flex justify-between items-center"}>
                <Label className={"text-sm"} htmlFor="password">Kata sandi</Label>
                <Link href={"/lupa-sandi"} className={"text-sm font-medium text-blue hover:opacity-70"}>Lupa Kata
                  Sandi?</Link>
              </div>
              <PasswordInput
                  className={inputClass}
                  placeholder={"Email Anda di sini"}
              />
            </div>
            <div>
              <Button
                  type={"submit"}
                  size={"lg"}
                  className={"w-full bg-blue rounded-lg mt-2 font-bold"}>
                Masuk
              </Button>
            </div>
          </form>
        </div>
        <div className={"flex flex-col gap-6"}>
          <div className={"flex flex-row justify-between items-center"}>
            <span className={"w-1/2 h-[1px] bg-primary border-t border-primary"}></span>
            <span className={"w-full mx-4 text-center text-sm"}>Atau lanjutkan dengan</span>
            <span className={"w-1/2 h-[1px] bg-primary border-t border-primary"}></span>
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
        <div className={"self-center"}>
          <span className={"mr-1.5"}>Belum memiliki akun?</span>
          <Link href={"/register"} className={"text-blue"}>Daftar Sekarang</Link>
        </div>
      </>
  )
}