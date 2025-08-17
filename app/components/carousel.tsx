"use client"

import * as React from "react"
import {Carousel, CarouselContent, CarouselItem,} from "@/components/ui/carousel"
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {useEffect, useState} from "react";

interface setData {
    image: string
    description: string
}

const carousel_dummy: setData[] = [
    {
        image: "/assets/product_banner.jpg",
        description: "Product Banner",
    },
    {
        image: "/assets/product_banner.jpg",
        description: "Product Banner",
    },
    {
        image: "/assets/product_banner.jpg",
        description: "Product Banner",
    }
]

const CarouselSection = () => {
    const [banners, setBanners] = useState<setData[]>()

    useEffect(() => {
      const fetchBanners = async () => {
    //     const response = await getBanners()

    //     setBanners(await response)
        setBanners(carousel_dummy)
      }

      fetchBanners()
    }, []);

    return (
        <>
            <Carousel className={"mt-10"}>
                <CarouselContent>
                    {banners?.map((val: setData, index: number) => (
                        <CarouselItem key={index}>
                          <Image className={"m-auto rounded-3xl"} src={val.image} alt={val.description} width={1440} height={400}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </>
    )
}

export default CarouselSection