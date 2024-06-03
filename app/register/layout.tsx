import "./style.css"
import React from "react";

const Layout = ({children}: { children: React.ReactNode }) => {
  return (
      <main className={"h-screen w-screen flex justify-center items-center"} id={"auth-bg"}>
        <div className={"w-screen sm:w-fit p-16 lg:p-20 flex flex-col gap-8 sm:rounded-2xl text-primary"}
             id={"form-wrap"}>
          {children}
        </div>
      </main>
  )
}

export default Layout