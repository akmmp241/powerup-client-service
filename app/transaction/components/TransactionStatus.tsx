"use client"

import React, {useEffect, useState} from "react";

const TransactionStatus = ({status}: {status: string}) => {
  const [style, setStyle] = useState<string>()

  useEffect(() => {
    switch (status) {
      case "PENDING":
        setStyle("text-[#FDBA74]")
        break
      case "REQUIRE_ACTION":
        setStyle("text-[#FDBA74]")
        break
      case "PROCESS":
        setStyle("text-primary")
        break
      case "SUCCEED":
        setStyle("text-[#2AA664]")
        break
      case "FAILED":
        setStyle("text-[#DC3636]")
        break
    }
  }, [style, status]);

  return (
      <p className={"max-w-[50%] overflow-scroll font-bold " + style}>{status}</p>
  )
}

export default TransactionStatus