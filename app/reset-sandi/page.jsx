import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {PasswordInput} from "@/components/ui/inputPassword";

export default function ResetSandi() {
  const inputClass = "w-full sm:w-[320px] lg:w-[400px] py-2 lg:py-3 pl-4 bg-transparent outline-1 outline outline-primary focus-visible:outline-blue rounded-lg text-sm"

  return (
      <>
        <div className={"text-primary text-3xl font-bold"}>
            <h1>Ubah Kata Sandi</h1>
        </div>
        <div>
          <form className={"flex flex-col gap-6 text-primary"}>
            <div className={"flex flex-col gap-1.5"}>
              <Label className={"text-sm"} htmlFor="password">Sandi</Label>
              <PasswordInput
                  className={inputClass}
                  placeholder={"Sandi Anda di sini"}
              />
            </div>
            <div className={"flex flex-col gap-1.5"}>
              <Label className={"text-sm"} htmlFor="password_confirmation">Konfirmasi Sandi</Label>
              <PasswordInput
                  className={inputClass}
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