"use client"

import getCategories from "@/app/partials/getCategories";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import getOperators from "@/app/partials/getOperators";
import Image from "next/image";
import Link from "next/link";

interface categoryInterface {
  id: number
  refId: number
  name: string
}

interface operatorInterface {
  id: number
  refId: number
  category_id: number
  category_name: string
  name: string
  slug: string
  image: string
}

const ProductSection = () => {
  const [categories, setCategories] = useState<[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [operator, setOperator] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    const getAllCategories = async () => {
      const {data} = await getCategories()

      setCategories(await data)
    }

    getAllCategories()

    const getAllOperators = async () => {
      setLoading(true)
      const data = await getOperators(selectedCategory, page)
      setLoading(false)
      setOperator(await data.data)
      setTotalPage(await data.totalPage)
    }

    getAllOperators()
  }, [page, selectedCategory])


  const selectCategoryHandle = (key: number) => {
    setSelectedCategory(key)
  }

  return (
      <div className={"flex flex-col gap-8 w-full"}>
        <div>
          <h1 className={"text-2xl md:text-3xl text-center md:text-left font-bold mb-3"}>Pilih Kategori</h1>
          <p className="text-center md:text-left font-medium">Berbagai Macam Pilihan TopUP yang lengkap</p>
        </div>

        <div className={"flex gap-3 overflow-scroll justify-between py-3 md:max-w-[50%]"}>
          {categories.map((val: categoryInterface, key: number) => (
              <Button
                  key={key}
                  id={val.id.toString()}
                  className={(selectedCategory === val.id ? "bg-primary" : "bg-transparent hover:bg-[rgba(56_110_220_.8)] hover:text-body-text text-inactive-text") + " rounded-3xl m-0 py-3 px-4 border-[2px] border-secondary"}
                  onClick={() => selectCategoryHandle(val.id)}>{val.name}</Button>
          ))}
        </div>

        <div>
          <h1 className={"text-2xl md:text-3xl text-center md:text-left font-bold mb-3"}>Top Up Game 🎮</h1>
        </div>

        <div className={"grid grid-cols-2 md:grid-cols-6 gap-5 p-4"}>
          {operator && operator.map((val: operatorInterface, key: number) => (
              <Link href={`/${val.slug}`} key={key} className={"flex flex-col gap-2 bg-secondary w-full p-3 rounded-2xl"}>
                <img src={val.image}  alt={val.name} className={"rounded-3xl"}/>
                <span className={"max-w-[100px] m-auto text-center"}>{val.name}</span>
              </Link>
          ))}
        </div>

        {page < totalPage && (
            <span onClick={() => setPage(page + 1)}>{loading ? "loading" : "load more"}</span>
        )}
      </div>
  )
}

export default ProductSection