import {Suspense} from "react";
import FormHeader from "@/app/register/components/formHeader";
import Form from "@/app/reset-password/components/form";

const ResetPassword = () => {

  return (
      <>
        <FormHeader message={"Reset Your Password"} />

        <Suspense fallback={<p>Sabar bang loading...</p>}>
          <Form />
        </Suspense>
      </>
  )
}

export default ResetPassword