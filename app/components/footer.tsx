import Image from "next/image";
import Link from "next/link";
import powerUpLogo from "@/app/assets/Logomark.svg";
import toTop from "@/app/assets/to-top button.svg";
import whatsappIcon from "@/app/assets/u_whatsapp.svg"
import instagramIcon from "@/app/assets/fi_instagram.svg"
import facebookIcon from "@/app/assets/fi_facebook.svg"

const Footer = () => {
  return (
      <footer className={"flex flex-col gap-20 w-full max-w-[1220px] m-auto text-body-text p-2 mt-12"}>
        <div className={"flex flex-col self-center gap-4 w-1/3"}>
          <div className={"flex flex-row items-center justify-center gap-3 cursor-pointer"}>
            <Image src={powerUpLogo} alt={"Logo PowerUp"}/>
            <h1 className={"text-body-text text-2xl font-bold"}>PowerUp</h1>
          </div>
          <p className={"text-center md:text-left font-medium"}>Top up lebih mudah dan tanpa hambatan dengan melakukan
            top up di PowerUp 🚀</p>
        </div>
        <div className={"flex flex-row justify-center w-full"}>
          <ul className={"grid grid-cols-1 justify-items-center gap-16 w-full font-medium basis-3/4"}>
            <li className={"flex flex-col items-center gap-2 w-fit"}>
              <span className={"text-2xl md:tex text-inactive-text"}>LOKASI</span>
              <p>Semarang, Jawa Tengah, Indonesia</p>
            </li>
            <li className={"flex flex-col items-center gap-2 w-fit"}>
              <span className={"text-inactive-text"}>EMAIL</span>
              <p>kelompok404@gmail.com</p>
            </li>
            <li className={"flex flex-col items-center gap-2 w-fit"}>
              <span className={"text-inactive-text"}>DUKUNGAN</span>
              <Link href={"/#"} className={"underline"}>Pusat Bantuan</Link>
            </li>
            <li className={"flex flex-col items-center gap-2 w-fit"}>
              <span className={"text-inactive-text"}>JAM OPERASIONAL</span>
              <p>07:00 WIB - 22:00 WIB</p>
            </li>
            <li className={"flex flex-col items-center gap-2 w-fit"}>
              <span className={"text-inactive-text"}>HUBUNGI KAMI</span>
              <p>+62 838 7390 6995</p>
            </li>
          </ul>
        </div>
        <div className={"relative basis-1/4"}>
          <Link href={"#main"}>
            <Image className={"absolute bottom-0 right-0"} src={toTop} alt={"To Top"}/>
          </Link>
        </div>
        <div className={"flex justify-between items-center w-full border-t-2 border-secondary"}>
          <div className={"py-6 max-w-[1220px] max-h-[112px]"}>
            <span className={"text-inactive-text"}>&copy; 2024 PowerUp - All rights reserved.</span>
          </div>
          <div className={"flex items-center gap-9"}>
            <Link href={"/"}>
              <Image src={whatsappIcon} alt={"WhatsApp"}/>
            </Link>
            <Link href={"/"}>
              <Image src={instagramIcon} alt={"Instagram"}/>
            </Link>
            <Link href={"/"}>
              <Image src={facebookIcon} alt={"Facebook"}/>
            </Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer