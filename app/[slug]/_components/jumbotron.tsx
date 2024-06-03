"use client"

import Image from "next/image";

const OperatorBanner = () => {
    return (
        <div className={"w-full h-fit mt-0 xl:mt-8"}>
            <Image src={"http://localhost:8000/storage/images/product-banner.svg"} alt={"banner"}
                   width={100} height={100}
                   sizes={"100vw"} style={{
                width: '100%', height: 'auto'
            }}/>
        </div>
    )
}

export default OperatorBanner