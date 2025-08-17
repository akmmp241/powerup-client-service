"use client"

import getPopular from "@/app/partials/getPopular";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {GetPopularsResponse} from "@/types/GetPopularsResponse";

interface PopularProps {
    id: number
    operator_id: number
    operator_name: string
    title: string
    image_url: string
    description: string
    link: string
}

const populars_dummy: PopularProps[] = [
    {
        id: 1,
        operator_id: 1,
        operator_name: "Mobile Legends",
        title: "",
        image_url: "/assets/popular-ml.png",
        description: "Mobile Legends",
        link: "/#",
    },
    {
        id: 2,
        operator_id: 2,
        operator_name: "Free Fire",
        title: "",
        image_url: "/assets/popular-ff.png",
        description: "Free Fire",
        link: "/#",
    },
    {
        id: 3,
        operator_id: 3,
        operator_name: "PUBG Mobile",
        title: "",
        image_url: "/assets/popular-pubgm.png",
        description: "PUBG Mobile",
        link: "/#",
    },
    {
        id: 4,
        operator_id: 4,
        operator_name: "CODM",
        title: "",
        image_url: "/assets/popular-codm.png",
        description: "Call Of Duty Mobile",
        link: "/#",
    },
    {
        id: 5,
        operator_id: 5,
        operator_name: "LOL",
        title: "",
        image_url: "/assets/popular-lol.png",
        description: "League Of Legends",
        link: "/#",
    },
    {
        id: 6,
        operator_id: 6,
        operator_name: "COC",
        title: "",
        image_url: "/assets/popular-coc.png",
        description: "Clash Of Clans",
        link: "/#",
    }
]

const Popular = () => {
  const [populars, setPopulars] = useState<PopularProps[]>([])

  const fetchPopulars = async () => {
    // const response = getPopular()

    setPopulars(populars_dummy)
  }

  useEffect(() => {
    fetchPopulars()
  }, []);

  return (
      <div className={"grid grid-cols-1 md:grid-cols-3 gap-5 p-4 md:p-0"}>
        {populars?.map((val: PopularProps, index: number) => (
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