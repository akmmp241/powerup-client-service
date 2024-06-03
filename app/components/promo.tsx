"use client"

import Link from "next/link";
import Image from "next/image";
import getPromos from "@/app/partials/getPromos";
import formatRupiah from "@/helpers/format-rupiah";
import priceLabel from "@/app/assets/Union.svg";
import {useEffect, useState} from "react";
import {GetPromosResponse} from "@/types/GetPromosResponse";


const Promo = () => {
  const [promos, setPromos] = useState<GetPromosResponse>()

  const fetchPromos = async () => {
    const response = getPromos()

    setPromos(await response)
  }

  useEffect(() => {
    fetchPromos()
  }, []);

  return (
      <div className={"grid grid-cols-4 gap-5"}>
        {promos?.data.map((val, index: number) => (
            <div key={index} className={"relative max-w-[300px] border-2 border-transparent hover:border-primary hover:opacity-60 rounded-2xl"}>
              <Link href={"#"}>
                <div className={"rounded-t-2xl"}>
                  <Image src={val.image_url} alt={val.description} width={300} height={140} sizes={"(max-width: 300px)"}/>
                </div>
                <div className={"flex flex-col bg-secondary px-4 py-2 gap-2.5 rounded-b-2xl"}>
                  <h1 className={"w-[60%] text-sm font-bold max-h-9 text-body-text"}>{val.title}</h1>
                  <div className={"flex flex-row justify-start items-center gap-2"}>
                    <span className={"text-lg font-bold"}>{formatRupiah(val.final_price.toString(), ".")}</span>
                    <span className={"text-sm text-inactive-text line-through"}>{formatRupiah(val.product_price.toString(), ".")}</span>
                  </div>
                </div>
                <div>
                  <Image className={"absolute  -top-1.5 -right-1.5"} src={priceLabel} alt={"label price"} />
                  <span className={"absolute top-2.5 right-0.5 rotate-45 text-lg font-bold"}>{val.percentage}%</span>
                </div>
              </Link>
            </div>
        ))}
      </div>
  )
}

export default Promo