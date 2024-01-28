import "./style.css"

export default function Template({children}) {
  return (
      <main className={"h-screen w-screen flex justify-center items-center"} id={"auth-bg"}>
        <div className={"w-screen sm:w-fit p-16 lg:p-20 flex flex-col gap-8 sm:rounded-2xl"} id={"form-wrap"}>
          {children}
        </div>
      </main>
  )
};