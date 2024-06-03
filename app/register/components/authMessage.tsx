const AuthMessage = ({message}: { message: string }) => {
  return (
      <div
          className={"flex justify-center items-center w-full sm:w-[320px] lg:w-[400px] py-2 lg:py-3 bg-[#DC3636] text-red-700 rounded-lg"}>
        <p className={"self-center text-sm text-primary"}>{message}</p>
      </div>
  )
}

export default AuthMessage