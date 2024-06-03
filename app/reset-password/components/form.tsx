import {ErrorMessagesType} from "@/types/errorMessages.type";
import {Label} from "@/components/ui/label";
import {PasswordInput} from "@/components/ui/inputPassword";
import ErrorMessage from "@/app/register/components/errorMessage";
import {Button} from "@/components/ui/button";

const Form = ({formHandler, errorMessages}: { formHandler: any, errorMessages: ErrorMessagesType | undefined }) => {

  const inputClass = "w-full sm:w-[320px] lg:w-[400px] py-2 lg:py-3 pl-4 bg-transparent outline-1 outline outline-primary focus-visible:outline-blue rounded-lg text-sm"
  const errInputClass = inputClass.replace('outline-primary', 'outline-red-500')

  return (
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
  )
}

export default Form