import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
  const inputClass = "w-full sm:w-[320px] lg:w-[400px] py-2 lg:py-3 pl-4 bg-transparent outline-1 outline outline-primary focus-visible:outline-blue rounded-lg text-sm"

  return (
      <>
        <div className={"text-primary text-3xl lg:text-4xl font-bold"}>
          <h1>Daftar Sekarang</h1>
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
              <label className={"text-sm"} htmlFor="Nama">Nama</label>
              <Input
                  className={inputClass}
                  type={"text"}
                  placeholder={"Email Anda di sini"}
              />
            </div>
            <div className={"flex flex-col gap-1.5"}>
              <label className={"text-sm"} htmlFor="password">Kata sandi</label>
              <Input
                  className={inputClass}
                  type={"text"}
                  placeholder={"Email Anda di sini"}
              />
            </div>
            <div className={"flex flex-col gap-1.5"}>
              <label className={"text-sm"} htmlFor="confirm">Konfirmasi Kata Sandi</label>
              <Input
                  className={inputClass}
                  type={"text"}
                  placeholder={"Email Anda di sini"}
              />
            </div>
            <div>
              <Button
                  type={"submit"}
                  size={"lg"}
                  className={"w-full bg-blue rounded-lg mt-2 font-bold"}>
                Daftar
              </Button>
            </div>
          </form>
        </div>
        <div className={"self-center"}>
          <span className={"mr-1.5"}>Sudah punya akun?</span>
          <Link href={"/login"} className={"text-blue"}>Masuk</Link>
        </div>
      </>
  )
}