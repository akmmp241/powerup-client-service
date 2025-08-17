"use client"

import Image from "next/image";
import powerUpLogo from "@/app/assets/Logomark.svg"
import SearchInput from "@/components/ui/searchInput";
import Link from "next/link";
import {useState} from "react";
import {Menu, X} from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-background w-full border-b border-secondary">
            <div className="flex flex-row justify-between py-6 max-w-[1220px] max-h-[112px] m-auto px-4">
                {/* Logo */}
                <div className="flex flex-row gap-16 items-center">
                    <Link href="/" className="flex flex-row items-center gap-3 cursor-pointer">
                        <Image src={powerUpLogo} alt="Logo PowerUp"/>
                        <h1 className="text-body-text text-2xl font-bold">PowerUp</h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:block">
                        <ul className="flex flex-row gap-9 text-inactive-text text-lg font-bold">
                            <li className="text-primary border-b-2 border-primary pb-1">
                                <Link className="hover:text-primary" href="/home">Home</Link>
                            </li>
                            <li><Link className="hover:text-primary" href="/home">Transaksi</Link></li>
                            <li><Link className="hover:text-primary" href="/home">Event</Link></li>
                        </ul>
                    </nav>
                </div>

                {/* Right section (search + login) */}
                <div className="hidden md:flex relative flex-row items-center gap-4">
                    <SearchInput/>
                    <Link
                        href="/login"
                        className="bg-primary text-body-text text-lg font-medium rounded-md px-6 py-2.5 hover:bg-[#335EB6]"
                    >
                        Masuk
                    </Link>
                </div>

                {/* Hamburger button (mobile only) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex items-center text-body-text"
                >
                    {isOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 border-t border-secondary">
                    <nav>
                        <ul className="flex flex-col gap-4 text-inactive-text text-lg font-bold mt-4">
                            <li className="text-primary border-b-2 border-primary pb-1">
                                <Link href="/home" onClick={() => setIsOpen(false)}>Home</Link>
                            </li>
                            <li>
                                <Link href="/home" onClick={() => setIsOpen(false)}>Transaksi</Link>
                            </li>
                            <li>
                                <Link href="/home" onClick={() => setIsOpen(false)}>Event</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-6 flex flex-col gap-4">
                        {/*<SearchInput/>*/}
                        <Link
                            href="/login"
                            className="bg-primary text-body-text text-lg font-medium rounded-md px-6 py-2.5 hover:bg-[#335EB6] text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Masuk
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar