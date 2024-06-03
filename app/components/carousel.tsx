"use client"

import * as React from "react"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import getBanners from "@/app/partials/getBanners";
import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import {GetBannersResponse} from "@/types/GetBannersResponse";

interface setData {
  image: string,
  description: string
}

const CarouselSection = () => {
  const [banners, setBanners] = useState<GetBannersResponse>()

  useEffect(() => {
    const fetchBanners = async () => {
      const response = await getBanners()

      setBanners(await response)
    }

    fetchBanners()
  }, []);

  return (
      <>
        <Carousel className={"mt-10"}>
          <CarouselContent>
            {banners?.data.map((val: setData, index: number) => (
                <CarouselItem key={index}>
                  <Image className={"m-auto"} src={val.image} alt={val.description} width={1440} height={400}/>
                </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </>
  )
}

export default CarouselSection