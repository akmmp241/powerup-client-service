import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/ui/inputPassword";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ErrorMessagesType} from "@/types/errorMessages.type";

const Form = ({formHandler, errorMessage}: { errorMessage: ErrorMessagesType | undefined, formHandler: any }) => {

  const inputClass = "w-full sm:w-[320px] lg:w-[400px] py-2 lg:py-3 pl-4 bg-transparent outline-1 outline outline-primary focus-visible:outline-blue rounded-lg text-sm"
  return (
      <div>
        <form
            action={formHandler}
            className={"flex flex-col gap-6 text-primary"}>
          <div className={"flex flex-col gap-1.5"}>
            <Label className={"text-sm"} htmlFor="Email">Email</Label>
            <Input
                className={inputClass}
                name={"email"}
                type={"email"}
                placeholder={"Email Anda di sini"}
                required
            />
            {errorMessage?.email ? errorMessage.email?.map((prop, id) => (
                <span key={id}>{prop}</span>
            )) : null}
          </div>
          <div className={"flex flex-col gap-1.5"}>
            <div className={"flex justify-between items-center"}>
              <Label className={"text-sm"} htmlFor="password">Kata sandi</Label>
              <Link href={"/forget-password"} className={"text-sm font-medium text-blue hover:opacity-70"}>Lupa Kata
                Sandi?</Link>
            </div>
            <PasswordInput
                name={"password"}
                className={inputClass}
                placeholder={"Email Anda di sini"}
                required
            />
            <div className={"flex flex-col"}>
              {errorMessage?.password ? errorMessage.password?.map((prop, id) => (
                  <span className={"text-red-700 text-sm"} key={id}>*{prop}</span>
              )) : null}
            </div>
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
  )
}

export default Form