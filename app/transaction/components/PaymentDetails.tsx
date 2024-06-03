import Image from "next/image";
import {Ewallet, GetTransactionResponse, PaymentActions, QRCode, VirtualAccount} from "@/types/GetTransactionResponse";
import mandiri from "@/app/assets/mandiri.svg"
import bca from "@/app/assets/bca.svg"
import qris from "@/app/assets/qris.svg"
import checklist from "@/app/assets/checklist.svg"
import dana from "@/app/assets/dana.svg"
import linkaja from "@/app/assets/linkaja.svg"
import ovo from "@/app/assets/ovo.svg"
import {useQRCode} from "next-qrcode";
import {ReactNode} from "react";

const OverTheCounterDetails = () => {
  return (
      <h1>OTC</h1>
  )
}

const VirtualAccountDetails = (image: any, va: VirtualAccount) => {
  return (
      <div className={"flex flex-col gap-4 pl-10"}>
        <div className={"flex items-center gap-4"}>
          <Image src={image} width={80} height={80}
                 alt={"image"} className={"rounded-xl"}
                 style={{width: '100%', height: 'auto'}}/>
          <div className={"flex flex-col gap-2"}>
            <h1 className={"text-xl font-bold"}>Mandiri Virtual Account</h1>
            <p className={"text-sm"}>Lakukan pembayaran dengan transfer ke nomor Virtual Account dibawah</p>
          </div>
        </div>
        <div className={"border-y-2 border-y-[#303745] py-4"}>
          <p className={"text-xl font-bold"}>{va.channel_properties.virtual_account_number}</p>
        </div>
        <div>
          <h2 className={"font-bold"}>Lihat Cara Bayar</h2>
          <p>Dari Mobile Banking</p>
          <ol>
            <li>1. Salin nomor virtual akun</li>
            <li>2. login ke aplikasi livin' mandiri</li>
            <li>3. klik bayar</li>
            <li>4. Cari penyedia jasa 70017 atau I-PAY</li>
            <li>5. paste/tempel nomor virtual akun tadi dan masukan nominal bayar yg sesuai</li>
            <li>6. lanjutkan</li>
          </ol>
        </div>
      </div>
  )
}

const QRCodeDetails = (transaction: QRCode) => {
  const {SVG} = useQRCode()

  return (
      <div className={"flex flex-col gap-4 items-center w-full"}>
        <h2 className={"text-xl font-bold text-inactive-text"}>Scan QR Code</h2>
        <div className={"flex flex-col gap-2 items-center w-1/2 p-4 bg-white rounded-xl"}>
          <div className={"w-[50%]"}>
            <Image alt={"gris logo"} src={qris} width={100} height={100} style={{width: '100%', height: 'auto'}}/>
          </div>
          <div className={"w-full"}>
            <SVG
                text={transaction.channel_properties.qr_string}/>
          </div>
        </div>
        <div className={"flex flex-col gap-3 p-4 w-4/5 border-t-2 border-t-[#303745]"}>
          <h3 className={"font-bold text-xl"}>Lihat Cara Bayar</h3>
          <p>
            Silahkan scan QR di atas dengan E-money seperti : OVO, DANA, GOPAY, LINKAJA, DLL <br/><br/>

            <span className={"font-medium"}>Jika ingin membayar dengan 1 HP</span> <br/>
            1. Download/Screnshot Barcode di atas <br/>
            2. Buka aplikasi E-wallet pilih Scan Barcode <br/>
            3. Insert Image from Galery dan pilih gambar Barcode <br/>
            4. Lalu Bayar dan selesai
          </p>
        </div>
      </div>
  )
}

const EwalletDetails = (channel_name: string | undefined, ewallet: Ewallet | undefined, actions: PaymentActions|null|undefined) => {
  let image;
  switch (ewallet?.channel_code) {
    case "DANA":
      image = dana
      break
    case "LINKAJA":
      image = linkaja
      break
      // case "SHOPEEPAY":
      //   image = import("@/app/assets/sho.svg")
      //   break
    case "OVO":
      image = ovo
      break
  }

  return (
      <div className={"flex flex-col gap-4 pl-10"}>
        <div className={"flex items-center gap-4"}>
          {/*@ts-ignore*/}
          <Image src={image} width={80} height={80}
                 alt={"image"} className={"rounded-xl"}
                 style={{width: '100%', height: 'auto'}}/>
          <div className={"flex flex-col gap-2"}>
            <h1 className={"text-xl font-bold"}>Bayar dengan {channel_name}</h1>
            <p className={"text-sm"}>Lakukan pembayaran dengan klik tombol dibawah</p>
          </div>
        </div>
        <a href={actions?.url} className={"bg-primary py-4 font-bold text-center rounded"}>Bayar Sekarang</a>
        <div>
          <h2 className={"font-bold"}>Lihat Cara Bayar</h2>
          <p>Dari Mobile Banking</p>
          <ol>
            <li>1. Salin nomor virtual akun</li>
            <li>2. login ke aplikasi livin' mandiri</li>
            <li>3. klik bayar</li>
            <li>4. Cari penyedia jasa 70017 atau I-PAY</li>
            <li>5. paste/tempel nomor virtual akun tadi dan masukan nominal bayar yg sesuai</li>
            <li>6. lanjutkan</li>
          </ol>
        </div>
      </div>
  )
}

interface params {
  expires_at: string | undefined,
  children: ReactNode,
  status: string
}

const WaitingPayment = ({expires_at, children, status}: params) => {
  return (
      <div className={"flex flex-col gap-8"}>
        <div className={"flex justify-between"}>
          <div className={"flex justify-center items-center gap-4"}>
            <div
                className={`flex justify-center items-center h-10 w-10 ${status === "PENDING" || status === "REQUIRES_ACTION" ? "bg-primary" : "bg-inactive-text"} rounded-full`}>
              <h1 className={"text-white font-bold"}>1</h1>
            </div>
            <h1 className={"text-xl font-bold"}>Menunggu Pembayaran</h1>
          </div>
          {status === "PENDING" || status === "REQUIRES_ACTION" ?
              <div className={"flex flex-col justify-center gap-1 text-right"}>
                <p className={"text-sm"}>Kadaluarsa dalam</p>
                <p className={""}>{expires_at}</p>
              </div> : ""}
        </div>
        {children}
      </div>
  )
}

const ProcessPayment = ({status}: { status: string | undefined }) => {
  return (
      <div className={"flex flex-col gap-8"}>
        <div className={"flex justify-between"}>
          <div className={"flex justify-center items-center gap-4"}>
            <div
                className={`flex justify-center items-center h-10 w-10 ${status === "PROCESS" ? "bg-primary" : "bg-inactive-text"} rounded-full`}>
              <h1 className={"text-white font-bold"}>2</h1>
            </div>
            <h1 className={"text-xl font-bold"}>Menunggu Pembayaran</h1>
          </div>
        </div>
      </div>
  )
}

const FinishPayment = ({status}: { status: string }) => {
  return (
      <div className={"flex flex-col gap-4"}>
        <div className={"flex justify-between"}>
          <div className={"flex justify-center items-center gap-4"}>
            <div
                className={`flex justify-center items-center h-10 w-10 ${status !== "SUCCEED" ? "bg-inactive-text" : "bg-[#2AA664]"} rounded-full`}>
              <h1 className={"text-white font-bold"}>
                {status !== "SUCCEED" ? "3"
                    :
                    <Image alt={"checklist"} src={checklist}/>}
              </h1>
            </div>
            <h1 className={"text-xl font-bold"}>Selesai</h1>
          </div>
        </div>
        <div className={"flex pl-12 justify-between"}>
          <div className={"pb-6 border-b-2 border-b-[#303745]"}>
            <p>Pesananmu sudah dikirim. Terima kasih ya! jika ada pertanyaan atau saran, silakan hubungi kami.</p>
          </div>
        </div>
      </div>
  )
}

const FailedPayment = ({failure_code}: { failure_code: string | null }) => {
  return (
      <div className={"flex flex-col gap-4"}>
        <div className={"flex justify-between"}>
          <div className={"flex justify-center items-center gap-4"}>
            <div
                className={`flex justify-center items-center h-10 w-10 bg-[#DC3636] rounded-full`}>
              <h1 className={"text-white font-bold"}>X</h1>
            </div>
            <h1 className={"text-xl font-bold"}>Transaksi Gagal</h1>
          </div>
        </div>
        <div className={"flex pl-12 justify-between"}>
          <div className={"pb-6 border-b-2 border-b-[#303745]"}>
            <p>Kode Kegagalan: <span className={"font-bold"}>{failure_code}</span></p>
          </div>
        </div>
      </div>
  )
}

const PaymentDetails = ({transaction}: { transaction: GetTransactionResponse | undefined }) => {

  const HandlePaymentDetail = () => {
    if (transaction?.data?.payment?.ewallet !== null)
      return EwalletDetails(transaction?.data?.transaction?.payment_method, transaction?.data?.payment?.ewallet, transaction?.data?.actions)
    if (transaction?.data?.payment?.virtual_account !== null) {
      let image;
      switch (transaction.data.transaction.payment_method) {
        case "BCA":
          image = bca
          break
        case "MANDIRI":
          image = mandiri
          break
      }

      return VirtualAccountDetails(image, transaction.data.payment.virtual_account)
    }
    if (transaction?.data?.payment?.qr_code !== null) return QRCodeDetails(transaction.data.payment.qr_code)
    if (transaction?.data?.payment?.over_the_counter !== null) return OverTheCounterDetails()

    return undefined
  }

  return (
      <div className={"flex flex-col gap-8 w-full p-6 bg-[#191D24] rounded-xl"}>
        <div className={"flex justify-between w-full pb-6 border-b-2 border-b-[#303745]"}>
          <div className={"flex gap-4"}>
            <div className={"size-20"}>
              {/*@ts-ignore*/}
              <Image src={transaction?.data?.transaction?.product?.operator_image} width={80} height={80}
                     alt={"image"} className={"rounded-xl"}
                     style={{width: '100%', height: 'auto'}}/>
            </div>
            <div className={"flex flex-col justify-evenly"}>
              <h1 className={"font-bold text-xl"}>{transaction?.data?.transaction?.product?.name}</h1>
              <p className={"text-sm"}>{transaction?.data?.transaction?.product?.operator_name}</p>
            </div>
          </div>
          <div className={"flex flex-col justify-evenly text-right"}>
            <h2 className={"text-xl font-bold"}>Total Pembayaran</h2>
            <h1 className={"text-xl font-bold"}>Rp. {transaction?.data?.transaction?.total}</h1>
          </div>
        </div>
        <div className={"flex flex-col gap-8 w-full"}>
          {transaction?.data?.transaction?.status === "FAILED" ?
              <>
                <FailedPayment failure_code={transaction.data.transaction.failure_code}/>
              </>
              :
              <>
                {/*@ts-ignore*/}
                <WaitingPayment status={transaction?.data?.transaction?.status}
                                expires_at={transaction?.data?.transaction?.created_at}>
                  {transaction?.data?.transaction?.status === "PENDING" ||
                  transaction?.data?.transaction?.status === "REQUIRES_ACTION"
                      ? <HandlePaymentDetail/> : null}
                </WaitingPayment>
                <ProcessPayment status={transaction?.data?.transaction?.status}/>
                {/*@ts-ignore*/}
                <FinishPayment status={transaction?.data?.transaction?.status}/>
              </>
          }
        </div>
      </div>
  )
}

export default PaymentDetails