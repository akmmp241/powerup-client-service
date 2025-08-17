"use client"

import Link from "next/link";
import Image from "next/image";
import formatRupiah from "@/helpers/format-rupiah";
import priceLabel from "@/app/assets/Union.svg";
import {useEffect, useState} from "react";
import promoML from "@/public/assets/promo-ml.png";


interface PromoInterface {
    id: number
    product_id: number
    product_name: string
    title: string
    description: string
    percentage: number
    product_url: string
    product_price: number
    final_price: number
    image_url: string
}

const promos_dummy = [
    {
        id: 1,
        product_id: 1,
        product_name: "Mobile Legend 55 Diamonds",
        title: "MLBB 55 Diamonds",
        description: "Promo Mobile Legend 55 Diamond",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 15000,
        final_price: 12000,
        image_url: "/assets/promo-ml.png",
    },
    {
        id: 2,
        product_id: 2,
        product_name: "Mobile Legend 100 Diamonds",
        title: "MLBB 100 Diamonds",
        description: "Promo Mobile Legend 100 Diamond",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 40000,
        final_price: 32000,
        image_url: "/assets/promo-ml.png",
    },
    {
        id: 3,
        product_id: 3,
        product_name: "Mobile Legend 500 Diamonds",
        title: "MLBB 500 Diamonds",
        description: "Promo Mobile Legend 500 Diamond",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 130000,
        final_price: 104000,
        image_url: "/assets/promo-ml.png",
    },
    {
        id: 5,
        product_id: 5,
        product_name: "Free Fire 100 Diamonds",
        title: "FF 100 Diamonds",
        description: "Promo Free Fire 100 Diamond",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 35000,
        final_price: 28000,
        image_url: "/assets/promo-ff.png",
    },
    {
        id: 4,
        product_id: 4,
        product_name: "Free Fire 200 Diamonds",
        title: "FF 200 Diamonds",
        description: "Promo Free Fire 200 Diamond",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 70000,
        final_price: 56000,
        image_url: "/assets/promo-ff.png",
    },
    {
        id: 6,
        product_id: 6,
        product_name: "Free Fire 300 Diamonds",
        title: "FF 300 Diamonds",
        description: "Promo Free Fire 300 Diamond",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 105000,
        final_price: 84000,
        image_url: "/assets/promo-ff.png",
    },
    {
        id: 7,
        product_id: 7,
        product_name: "Roblox 120 Robux",
        title: "Roblox 120 Robux",
        description: "Promo Roblox 120 Robux",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 80000,
        final_price: 64000,
        image_url: "/assets/promo-rbx.png",
    },
    {
        id: 8,
        product_id: 8,
        product_name: "Roblox 200 Robux",
        title: "Roblox 200 Robux",
        description: "Promo Roblox 200 Robux",
        percentage: 20,
        product_url: "https://www.google.com/",
        product_price: 120000,
        final_price: 84000,
        image_url: "/assets/promo-rbx.png",
    },
]

const Promo = () => {
  const [promos, setPromos] = useState<PromoInterface[]>([])

  const fetchPromos = async () => {
    // const response = getPromos()

    // setPromos(await response)
    setPromos(promos_dummy)
  }

  useEffect(() => {
    fetchPromos()
  }, []);

  return (
      <div className={"grid grid-cols-1 md:grid-cols-4 auto-cols-auto gap-5"}>
        {promos?.map((val, index: number) => (
            <div key={index} className={"relative max-w-[300px] m-auto border-2 border-transparent hover:border-primary hover:opacity-60 rounded-2xl"}>
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