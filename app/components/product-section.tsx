"use client";

import getCategories from "@/app/partials/getCategories";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import getOperators from "@/app/partials/getOperators";
import Link from "next/link";
import Image from "next/image";

interface GlobalRes<T> {
    status: number;
    rc: number;
    message: string;
    data: T | null;
}

interface ErrRes {
    status: number;
    rc: number;
    error_msg: string;
}

interface categoryInterface {
    id: number;
    refId: number;
    nama: string;
}

interface operatorInterface {
    id: number;
    nama_category: string;
    nama: string;
    status: number;
    logo: string;
}

const categories_dump: categoryInterface[] = [
    {
        id: 1,
        refId: 1,
        nama: "test1",
    },
    {
        id: 1,
        refId: 1,
        nama: "test2",
    }
];

const products_dump: operatorInterface[] = []

const ProductSection = () => {
    const [categories, setCategories] = useState<categoryInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [operator, setOperator] = useState<operatorInterface[]>([]);
    const [visibleCount, setVisibleCount] = useState(15);

    useEffect(() => {
        const getAllCategories = async () => {
            const {data} = await getCategories();

            setCategories(data)
        };

        getAllCategories();

        const getAllOperators = async () => {
            const {data} = await getOperators(selectedCategory);
            setOperator(data);
        };

        getAllOperators();
    }, [selectedCategory]);

    const selectCategoryHandle = (key: number) => {
        setSelectedCategory(key);
        setVisibleCount(15)
    };

    const loadMore = () => {
        setVisibleCount((prev) => prev + 15); // add 5 more each time
    };

    return (
        <div className={"flex flex-col gap-8 w-full"}>
            <div>
                <h1
                    className={
                        "text-2xl md:text-3xl text-center md:text-left font-bold mb-3"
                    }
                >
                    Pilih Kategori
                </h1>
                <p className="text-center md:text-left font-medium">
                    Berbagai Macam Pilihan TopUP yang lengkap
                </p>
            </div>

            <div
                className={
                    "flex gap-3 overflow-scroll justify-between py-3 px-3 lg:px-0 md:max-w-[50%]"
                }
            >
                {categories.map((val: categoryInterface, key: number) => (
                    <Button
                        key={key}
                        id={val.id.toString()}
                        className={
                            (selectedCategory === val.id
                                ? "bg-primary"
                                : "bg-transparent hover:bg-[rgba(56_110_220_.8)] hover:text-body-text text-inactive-text") +
                            " rounded-3xl m-0 py-3 px-4 border-[2px] border-secondary"
                        }
                        onClick={() => selectCategoryHandle(val.id)}
                    >
                        {val.nama}
                    </Button>
                ))}
            </div>

            <div>
                <h1
                    className={
                        "text-2xl md:text-3xl text-center md:text-left font-bold mb-3"
                    }
                >
                    Top Up Game 🎮
                </h1>
            </div>

            <div className={"grid grid-cols-2 md:grid-cols-6 gap-5 p-4"}>
                {operator &&
                    operator.slice(0, visibleCount).map((val: operatorInterface, key: number) => (
                        <>
                            {val.status === 1 ? (
                                <div
                                    className={"flex flex-col gap-2 bg-secondary w-full p-3 rounded-2xl cursor-pointer"}
                                    key={key}>
                                    {/*<Link*/}
                                    {/*    href={`/${val.slug}`}*/}
                                    {/*    key={key}*/}
                                    {/*    className={*/}
                                    {/*        "flex flex-col gap-2 bg-secondary w-full p-3 rounded-2xl"*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    <Image
                                        src={val.logo}
                                        alt={val.nama}
                                        width={120}
                                        height={120}
                                        style={{width: "100%", height: "auto"}}
                                        quality={100}
                                        className={"rounded-3xl"}
                                    />
                                    <span className={"max-w-[100px] m-auto text-center"}>
                                        {val.nama}
                                    </span>
                                    {/*</Link> */}
                                </div>
                            ) : (
                                <>
                                </>
                            )}
                        </>
                    ))}
            </div>
            {visibleCount < operator.length && (
                <span className={"text-center text-primary cursor-pointer"} onClick={loadMore}>Tampilkan lebih banyak...</span>
            )}
        </div>
    );
};

export default ProductSection;
