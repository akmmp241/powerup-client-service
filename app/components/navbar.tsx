"use client"

import Image from "next/image";
import powerUpLogo from "@/app/assets/Logomark.svg"
import SearchInput from "@/components/ui/searchInput";
import Link from "next/link";

const Navbar = () => {
  return (
      <header className={"bg-background w-full border-b border-secondary"}>
        <div className={"flex flex-row justify-between py-6 max-w-[1220px] max-h-[112px] m-auto"}>
          <div className={"flex flex-row gap-16 items-center"}>
            <Link href={"/"} className={"flex flex-row items-center gap-3 cursor-pointer"}>
              <Image src={powerUpLogo} alt={"Logo PowerUp"}/>
              <h1 className={"text-body-text text-2xl font-bold"}>PowerUp</h1>
            </Link>
            <nav>
              <ul className={"flex flex-row gap-9 text-inactive-text text-lg font-bold"}>
                <li className={"text-primary border-b-2 border-primary pb-1"}><Link className={"hover:text-primary"} href={"/home"}>Home</Link></li>
                <li><Link className={"hover:text-primary"} href={"/home"}>Transaksi</Link></li>
                <li><Link className={"hover:text-primary"} href={"/home"}>Event</Link></li>
              </ul>
            </nav>
          </div>
          <div className={"relative flex flex-row items-center gap-4"}>
            <SearchInput/>
            <div>
              <Link href={"/login"} className={"bg-primary text-body-text text-lg font-medium rounded-md px-6 py-2.5 hover:bg-[#335EB6]"}>Masuk</Link>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Navbar