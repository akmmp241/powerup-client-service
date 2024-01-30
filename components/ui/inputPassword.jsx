"use client"

import * as React from "react";
import { cn } from "@/lib/utils"
import hide from "./assets/Hide.svg"
import show from "./assets/Show.svg"
import Image from "next/image";
import {useState} from "react";

const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [visibility, setVisibility] = useState(true)

  const togglePassword = () => {
    setVisibility(!visibility)
  }

  const inputIcon = visibility ? hide : show
  const inputType = visibility ? "password" : "text"

  return (
      <div className={"relative"}>
        <input
            type={inputType}
            className={cn(
                "flex w-full rounded-md bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props} />
        <span id={"password-toggle-icon"} onClick={togglePassword}>
          <Image id={"password-icon"} src={inputIcon} alt={"show"} />
        </span>
      </div>
  );
})
PasswordInput.displayName = "PasswordInput"

export {PasswordInput}
