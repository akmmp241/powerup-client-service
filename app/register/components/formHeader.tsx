const FormHeader = ({message}: { message: string }) => {
  return (
      <div className={"text-primary text-3xl lg:text-4xl font-bold"}>
        <h1>{message}</h1>
      </div>
  )
}

export default FormHeader