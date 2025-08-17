import Link from "next/link";

const FormFooter = ({message, uri, link}: { message: string, uri: string, link: string }) => {
  return (
      <div className={"self-center"}>
        <span className={"mr-1.5 text-white"}>{message}</span>
        <Link href={uri} className={"text-primary"}>{link}</Link>
      </div>
  )
}

export default FormFooter