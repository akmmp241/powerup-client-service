import * as React from "react"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import getBanners from "@/app/partials/getBanners";
import Image from "next/image";

interface setData {
  image: string,
  description: string
}

const CarouselSection = async () => {

  const {data} = await getBanners();

  const payload = await data.data

  return (
      <>
        <Carousel className={"mt-10"}>
          <CarouselContent>
            {payload.map((val: setData, index: number) => (
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