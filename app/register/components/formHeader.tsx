const FormHeader = ({message}: { message: string }) => {
  return (
      <div className={" text-3xl lg:text-4xl font-bold"}>
        <h1 className={"text-white"}>{message}</h1>
      </div>
  )
}

export default FormHeader