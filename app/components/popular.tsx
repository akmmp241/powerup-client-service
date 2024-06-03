import getPopular from "@/app/partials/getPopular";
import Image from "next/image";
import Link from "next/link";

interface setData {
  id: number
  operator_id: number
  operator_name: string
  title: string
  image_url: string
  description: string
  link: string
}

const Popular = async () => {

  const {data} = await getPopular()
  const payload = data.data

  return (
      <div className={"grid grid-cols-3 gap-5"}>
        {payload.map((val: setData, index: number) => (
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