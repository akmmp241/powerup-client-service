import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import pilihanGame from "@/app/assets/ion_game-controller-outline.svg";
import pointerIcon from "@/app/assets/akar-icons_pointer-hand.svg"
import coinIcon from "@/app/assets/iconoir_coin.svg"
import clockIcon from "@/app/assets/tabler_clock-bolt.svg"
import walletIcon from "@/app/assets/ion_wallet-outline.svg"
import headphoneIcon from "@/app/assets/iconoir_headset-help.svg"


const About = () => {
  return (
      <div className={"flex flex-col gap-8 w-full"}>
        <div>
          <h1 className={"text-3xl font-bold mb-3"}>PowerUp Store ⚡</h1>
          <p className={"font-medium"}>Apa keuntungan yang didapatkan customer saat melakukan top up dan pembelian
            melalui website PowerUp? PowerUp menawarkan pembelian kredit game dengan lancar: tanpa registrasi ataupun
            log-in, dan kredit permainan akan ditambahkan secara instan.</p>
        </div>
        <div className={"grid grid-cols-2 gap-8"}>
          <Card className={"bg-secondary text-body-text border-none"}>
            <CardContent className={"flex flex-row justify-center items-center gap-5 p-5  w-full"}>
              <Image src={pilihanGame} alt={"controller"} width={60} height={60}/>
              <div>
                <h1 className={"text-2xl font-bold"}>Pilihan Game</h1>
                <p className={"text-sm font-medium"}>Kami menyediakan top up untuk berbagai macam pilihan game. Pilihlah
                  game sesuai keiinginanmu!</p>
              </div>
            </CardContent>
          </Card>
          <Card className={"bg-secondary text-body-text border-none"}>
            <CardContent className={"flex flex-row justify-center items-center gap-5 p-5  w-full"}>
              <Image src={pointerIcon} alt={"controller"} width={60} height={60}/>
              <div>
                <h1 className={"text-2xl font-bold"}>variasi Nominal</h1>
                <p className={"text-sm font-medium"}>Kami menyediakan top up untuk berbagai macam pilihan game. Pilihlah game sesuai keiinginanmu!</p>
              </div>
            </CardContent>
          </Card>
          <Card className={"bg-secondary text-body-text border-none"}>
            <CardContent className={"flex flex-row justify-center items-center gap-5 p-5  w-full"}>
              <Image src={coinIcon} alt={"controller"} width={60} height={60}/>
              <div>
                <h1 className={"text-2xl font-bold"}>Harga Terjangkau</h1>
                <p className={"text-sm font-medium"}>Nikmati kemudahan dan juga kenyamanan, top up dengan harga yang sangat terjangkau.</p>
              </div>
            </CardContent>
          </Card>
          <Card className={"bg-secondary text-body-text border-none"}>
            <CardContent className={"flex flex-row justify-center items-center gap-5 p-5  w-full"}>
              <Image src={clockIcon} alt={"controller"} width={60} height={60}/>
              <div>
                <h1 className={"text-2xl font-bold"}>Pengiriman Cepat</h1>
                <p className={"text-sm font-medium"}>Pengalaman top up yang cepat dan efisien dengan layanan pengiriman instan dari website kami!</p>
              </div>
            </CardContent>
          </Card>
          <Card className={"bg-secondary text-body-text border-none"}>
            <CardContent className={"flex flex-row justify-center items-center gap-5 p-5  w-full"}>
              <Image src={walletIcon} alt={"controller"} width={60} height={60}/>
              <div>
                <h1 className={"text-2xl font-bold"}>Metode Pembayaran</h1>
                <p className={"text-sm font-medium"}>Kami menawarkan berbagai pilihan metode pembayaran seperti QRIS, eWallet, Pulsa dan Transfer Bank.</p>
              </div>
            </CardContent>
          </Card>
          <Card className={"bg-secondary text-body-text border-none"}>
            <CardContent className={"flex flex-row justify-center items-center gap-5 p-5  w-full"}>
              <Image src={headphoneIcon} alt={"controller"} width={60} height={60}/>
              <div>
                <h1 className={"text-2xl font-bold"}>Layanan Pelanggan</h1>
                <p className={"text-sm font-medium"}>Jika Anda memiliki kendala, tim support kami siap membantu Anda dengan tanggapan secepatnya.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default About