"use client"

import getPopular from "@/app/partials/getPopular";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {GetPopularsResponse} from "@/types/GetPopularsResponse";

const Popular = () => {
  const [populars, setPopulars] = useState<GetPopularsResponse>()

  const fetchPopulars = async () => {
    const response = getPopular()

    setPopulars(await response)
  }

  useEffect(() => {
    fetchPopulars()
  }, []);

  return (
      <div className={"grid grid-cols-3 gap-5"}>
        {populars?.data.map((val, index: number) => (
            <div key={index} className={"relative popular-card border-[3px] border-transparent rounded-2xl"}>
              <Link href={val.link}>
                <Image src={val.image_url} alt={val.description} width={420} height={210}/>
                <span className={"absolute w-full text-center text-xl font-bold top-[80%] z-10"}>{val.operator_name}</span>
              </Link>
            </div>
        ))}
      </div>
  )
}

export default Popular