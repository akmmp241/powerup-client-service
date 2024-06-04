"use client"

import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {GetOperatorResponse} from "@/types/GetOperatorResponse";
import Navbar from "@/app/components/navbar";
import "@/app/register/style.css"
import OperatorBanner from "@/app/[slug]/_components/jumbotron";
import Image from "next/image";
import LineBreak from "@/app/components/line";
import {GetTypesResponse} from "@/types/GetTypesResponse";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Footer from "@/app/components/footer";
import {GetProductResponse} from "@/types/GetProductResponse";
import formatRP from "@/helpers/formatRP";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Error from "next/error";
import {GetPaymentMethodsResponse} from "@/types/GetPaymentMethodsResponse";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";
import fetchSingleOperator from "@/app/[slug]/_partials/fetchOperator";
import fetchTypes from "@/app/[slug]/_partials/fetchTypes";
import fetchProducts from "@/app/[slug]/_partials/fetchProducts";
import fetchPaymentsMethods from "@/app/[slug]/_partials/fetchPaymentMethods";
import diamond from "@/app/assets/diamond.svg"

interface Params {
  params: {
    slug: string
  }
}

interface FormatForm {
  data: [{
    name: string,
    value: string
  }],
  name: string,
  label: string,
  is_dropdown: boolean,
}

interface Product {
  ref_id: number
  type_id: number
  category_name: string
  type_name: string
  code: string
  name: string
  price: number
  description: string
  status: number
}

interface PaymentMethod {
  id: number
  type: string
  channel_code: string
  name: string
  charge: number
  icon: string | null
}

export default function Operator({params}: Params) {
  const router = useRouter()
  const {toast} = useToast()
  const [operator, setOperator] = useState<GetOperatorResponse>()
  const [types, setTypes] = useState<GetTypesResponse>()
  const [products, setProducts] = useState<GetProductResponse>()
  const [currentActiveType, setCurrentActiveType] = useState<number>()
  const [formatForm, setFormatForm] = useState<[FormatForm]>()
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [isError, setIsError] = useState<boolean>()
  const [errorCode, setErrorCode] = useState<number>(0)
  const [paymentMethods, setPaymentMethods] = useState<GetPaymentMethodsResponse>()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>()
  const [totalCharge, setTotalCharge] = useState<number>(0)
  const [showPaymentDescription, setShowPaymentDescription] = useState<boolean>(false)
  const [formPayload, setFormPayload] = useState<FormData>(new FormData)

  const fetchOperator = async () => {
    try {
      const response: GetOperatorResponse = await fetchSingleOperator(params.slug)

      setOperator(response);

      await fetchType(response.data.id)
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsError(!err?.response?.data.success)
        setErrorCode(err?.response?.data.status_code)
      }
    }
  }

  const fetchType = async (id: number | undefined) => {
    try {
      const response: GetTypesResponse = await fetchTypes(id)

      setTypes(response)
      setFormatForm(JSON.parse(response.data[0].format_form))

      if (currentActiveType === undefined) setCurrentActiveType(response.data[0].ref_id)

      await fetchProduct(response.data[0].ref_id)
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsError(!err?.response?.data.success)
        setErrorCode(err?.response?.data.status_code)
      }
    }
  }

  const fetchProduct = async (id: number | undefined) => {
    try {
      const response: GetProductResponse = await fetchProducts(id);

      setProducts(response);
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsError(!err?.response?.data.success)
        setErrorCode(err?.response?.data.status_code)
      }
    }
  }

  const fetchPaymentMethods = async () => {
    try {
      const response: GetPaymentMethodsResponse = await fetchPaymentsMethods()

      setPaymentMethods(response);
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsError(!err?.response?.data.success)
        setErrorCode(err?.response?.data.status_code)
      }
    }
  }

  useEffect(() => {
    fetchOperator()
    fetchPaymentMethods()
  }, [isError])

  useEffect(() => {
    if (currentActiveType !== undefined) fetchProduct(currentActiveType)
  }, [currentActiveType]);

  const handleChooseCategory = (id: number) => {
    const getType = types?.data.find(ele => ele.ref_id === id)
    // @ts-ignore
    setCurrentActiveType(getType.ref_id)
    setSelectedProduct(undefined)
    // @ts-ignore
    setFormatForm(JSON.parse(getType.format_form))
  }

  const handleChooseProduct = (product: Product) => {
    setSelectedProduct(product)
    setTotalCharge(product.price)
  }

  const handleChoosePaymentMethod = (payment: PaymentMethod) => {
    if (selectedProduct === undefined) {
      toast({
        variant: "destructive",
        title: "Tidak bisa memilih metode pembayaran",
        description: "Pilih Produk terlebih dahulu"
      })
      router.push("#product")
      return
    }

    const charge = payment.charge < 1 ? Math.round(selectedProduct.price * payment.charge) : payment.charge

    setTotalCharge(selectedProduct.price + charge)

    setSelectedPaymentMethod(payment)
  }

  const handlePaymentCanOpen = (formData: FormData) => {
    let open: boolean = true

    if (formData.get("tujuan") === "") {
      toast({
        variant: "destructive",
        title: "Masukan semua informasi akun yang diperlukan!",
      })
      const elem = document.getElementById("info-akun")
      elem?.scrollIntoView({
        behavior: "smooth",
      })
      return
    }

    if (selectedProduct === undefined) {
      toast({
        variant: "destructive",
        title: "Pilih Product Dahulu!",
      });
      const elem = document.getElementById("product");
      elem?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }
    if (selectedPaymentMethod === undefined) {
      toast({
        variant: "destructive",
        title: "Pilih Metode Pembayaran dahulu!",
      })
      const elem = document.getElementById("payment-method")
      elem?.scrollIntoView({
        behavior: "smooth",
      })
      return
    }
    if (formData.get("email") === "") {
      toast({
        variant: "destructive",
        title: "Masukan Email!",
      })
      const elem = document.getElementById("email")
      elem?.scrollIntoView({
        behavior: "smooth",
      })
      return
    }

    setFormPayload(formData)
    setShowPaymentDescription(open)
  }

  const handleForm = async () => {
    const baseUrl: string = "http://localhost:8000/api"
    const {tujuan, server_id, email} = Object.fromEntries(formPayload.entries())

    try {
      const {data} = await axios.post(`${baseUrl}/transaction/charge`, {
        operator_id: operator?.data?.id,
        product_code: selectedProduct?.code,
        destination: tujuan,
        server_id: server_id,
        channel_code: selectedPaymentMethod?.channel_code,
        total: totalCharge,
        email: email
      });

      const response: GetChargeResponse = await data

      router.push(`/transaction/${response.data.transaction_id}`)
      return
    } catch (err) {
      if (err instanceof AxiosError) {
        const title = err.response?.status === 500 ? "Something Wrong" : err.response?.data.message
        toast({
          variant: "destructive",
          title: title
        })
      }
    }
  }

  return isError ?
      <Error statusCode={errorCode}/>
      :
      <>
        <Navbar/>
        <form action={(formData) => handlePaymentCanOpen(formData)}>
          <main id={"main"} className={"flex flex-col gap-12 w-full max-w-[1220px] m-auto text-body-text"}>
            <OperatorBanner/>

            <div className={"flex flex-col xl:flex-row gap-5 m-auto mx-10 xl:m-0 h-fit"}>
              <div className={"flex flex-col gap-8 w-full xl:w-2/5"}>
                <div className={"w-full bg-secondary p-6 rounded-2xl"}>
                  <div className={"flex flex-row gap-4 items-center"}>
                    <div className={"w-[100px] h-[100px]"}>
                      {operator?.data.image ? (
                          <Image className={"rounded-[8px]"} src={operator?.data.image} alt={"Image"}
                                 width={80} height={80}
                                 style={{width: '100%', height: 'auto'}}/>
                      ) : (
                          <div className={"w-full h-auto"}>

                          </div>
                      )}
                    </div>
                    <div className={"w-2/3"}>
                      <h1 className={"text-xl font-bold"}>{operator?.data.name}</h1>
                      <p className={"text-sm text-inactive-text"}>Multiplayer online battle arena,
                        Action role-playing game</p>
                    </div>
                  </div>
                  <br/>
                  <LineBreak/>
                  <div>
                    <p className={"text-justify"}>Top up MLBB/Mobile Legends: Bang Bang sekarang semakin
                      mudah bersama PowerUp! Kamu
                      bisa menggunakannya untuk membeli skin favorit kesukaanmu. Cukup masukkan ID, pilih
                      nominal dan lakukan pembayaran.
                    </p>
                    <br/>
                    <p className={"text-justify"}>
                      PowerUp juga menyediakan beragam pilihan metode pembayaran untuk top up MLBB yang
                      memudahkan proses pembelian Diamonds MLBB. Kamu bisa dengan mudah menggunakan saldo
                      DANA, OVO, ShopeePay, GoPay, LinkAja, Indomaret, Alfamart, dan pembayaran lainya
                      untuk menyelesaikan proses transaksi. Top up Diamonds MLBB juga bisa dilakukan tanpa
                      registrasi, kartu kredit dan tanpa harus login.
                    </p>
                  </div>
                </div>
                <div className={"flex flex-col gap-4 bg-secondary p-6 rounded-2xl"}>
                  <h1 className={"text-xl font-bold text-center"}>Cara TopUp</h1>
                  <ul>
                    <li>1) Pilih Nominal</li>
                    <li>2) Masukan Data Akun</li>
                    <li>3) Tentukan Jumlah Pembelian</li>
                    <li>4) Pilih Pembayaran</li>
                    <li>5) Isi Detail Kontak</li>
                    <li>6) Klik Pesan dan Lakukan Pembayaran</li>
                    <li>7) Selesai</li>
                  </ul>
                </div>
              </div>
              <div className={"flex flex-col gap-12 flex-grow"}>
                <div id={"info-akun"} className={"flex flex-col gap-8 w-full bg-secondary rounded-[12px]"}>
                  <div className={"relative flex flex-row gap-2 md:gap-10 items-center"}>
                    <div
                        className={"absolute flex justify-center items-center left-4 -top-4 md:left-5 md:-top-5 w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary text-white text-center"}>
                      <h1 className={"flex justify-center items-center w-10 h-10 rounded-full text-center bg-primary"}>1</h1>
                    </div>
                    <h2 className={"relative font-bold left-20 md:left-24 mt-2 text-xl md:text-2xl"}>Masukan Info Akun</h2>
                  </div>
                  <div className={"flex flex-col xl:flex-row gap-4 w-[90%] mx-auto pb-6"}>
                    {formatForm?.map((value, index) => {
                      return value.is_dropdown ? (
                          <select key={index}
                                  className={`bg-background outline-none shadow-none focus:outline-primary text-xs px-5 h-10 rounded-[6px] w-full xl:${index > 0 ? "w-1/5" : "w-1/2"}`}
                                  name={value.name}>
                            <option value={""}>{value.label}</option>
                            {value.data.map((val, index) => (
                                <option key={index} value={val.value}>{val.name}</option>
                            ))}
                          </select>
                      ) : (
                          <input
                              className={`bg-background outline-none shadow-none focus:outline-primary text-xs px-5 h-10 rounded-[6px] w-full xl:${index > 0 ? "w-1/5" : "w-1/2"}`}
                              type="text" key={index} name={value.name}
                              placeholder={value.label}/>
                      )
                    })}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div
                            className={"flex justify-center items-center h-8 w-8 rounded-full bg-white"}>
                          <h1 className={"text-background"}>?</h1>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className={"gap-10 bg-secondary border-none"}>
                        <AlertDialogHeader>
                          <div className={"flex flex-col gap-4"}>
                            <AlertDialogTitle className={"text-white text-2xl"}>Data
                              Akun</AlertDialogTitle>
                            <div
                                className={"text-black bg-white flex justify-center items-center w-full h-[180px]"}>
                              something
                            </div>
                          </div>
                          <AlertDialogDescription className={"text-white text-md"}>
                            Klik menu profile dibagian kiri atas pada menu utama game. User
                            ID
                            akan terlihat dibagian bawah Nama Karakter Game Anda. <strong>Contoh
                            :
                            12345678(1234).</strong>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                              className={"mx-auto bg-primary font-bold"}>Konfirmasi</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div id={"product"} className={"flex flex-col gap-8 bg-secondary rounded-[12px]"}>
                  <div className={"relative flex flex-row gap-10 items-center"}>
                    <div
                        className={"absolute flex justify-center items-center left-4 -top-4 md:left-5 md:-top-5 w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary text-white text-center"}>
                      <h1 className={"flex justify-center items-center w-10 h-10 rounded-full text-center bg-primary"}>2</h1>
                    </div>
                    <h2 className={"relative font-bold left-20 md:left-24 mt-2 text-xl md:text-2xl"}>Pilih Item TopUp</h2>
                  </div>
                  <div className={"flex flex-col gap-2 w-[90%] mx-auto"}>
                    <h3 className={"text-white font-bold"}>Pilih Kategori</h3>
                    <div className={"grid grid-cols-1 xl:grid-cols-3 gap-8"}>
                      {types?.data.map((value, index) => {
                        const selected: boolean = value.ref_id === currentActiveType
                        return (
                            <button
                                type={"button"}
                                className={`flex gap-3 items-center ${selected ? "bg-secondary" : "bg-background"} active:bg-primary p-3 border-2 ${selected ? "border-primary" : "border-[#303745]"} rounded-[8px] w-full`}
                                onClick={() => handleChooseCategory(value.ref_id)}
                                key={index}>
                              <div className={"aspect-square w-[40px] h-[40px] bg-white"}>
                                {/*@ts-ignore*/}
                                <Image alt={"types"} src={operator?.data?.image} width={40} height={40} style={{width: '100%', height: 'auto'}}/>
                              </div>
                              <h1 className={"text-md overflow-hidden font-bold"}>{value.name}</h1>
                            </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className={"flex flex-col gap-2 w-[90%] mx-auto pb-6"}>
                    <h3 className={"text-white font-bold"}>Pilih Item</h3>
                    <div className={"grid grid-cols-2 xl:grid-cols-3 gap-4"}>
                      {products?.data.map((value, index) => {
                        const selected: boolean = value.ref_id === selectedProduct?.ref_id
                        return (
                            <button key={index} type={"button"}
                                    onClick={() => handleChooseProduct(value)}
                                    className={`flex flex-col justify-center items-center gap-1 w-full h-40 ${selected ? "bg-secondary" : "bg-background"} border-2 ${selected ? "border-primary" : "border-[#303745]"} rounded-[8px]`}>
                              <div className={"w-[40px] h-[40px]"}>
                                <Image alt={"diamond"} src={diamond} width={40} height={40} style={{width: '100%', height: 'auto'}}/>
                              </div>
                              <h3 className={"text-xs md:text-sm font-bold"}>{value.name}</h3>
                              <p className={"text-sm text-inactive-text"}>{value.description}</p>
                              <h3>{formatRP(value.price)}</h3>
                            </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div id={"payment-method"} className={"flex flex-col gap-8 bg-secondary rounded-[12px]"}>
                  <div className={"relative flex flex-row gap-10 items-center"}>
                    <div
                        className={"absolute flex justify-center items-center left-4 -top-4 md:left-5 md:-top-5 w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary text-white text-center"}>
                      <h1 className={"flex justify-center items-center w-10 h-10 rounded-full text-center bg-primary"}>3</h1>
                    </div>
                    <h2 className={"relative font-bold left-20 md:left-24 mt-2 text-xl md:text-2xl"}>Pilih Metode
                      Pembayaran</h2>
                  </div>
                  <div className={"p-6"}>
                    <Accordion type="single" className={"flex flex-col gap-8"} collapsible>
                      {paymentMethods?.data.map((val, index) => (
                          <AccordionItem key={index} className={"border-none"}
                                         value={`item-${index}`}>
                            <div className={"w-full rounded-[8px] bg-[#191D24]"}>
                              <div
                                  className={"flex flex-row justify-between px-5 border-b border-inactive-text py-3"}>
                                <h2 className={"font-bold"}>{val.name}</h2>
                              </div>
                              <AccordionContent>
                                <div
                                    className={"grid grid-cols-1 xl:grid-cols-2 gap-4 px-5 py-3"}>
                                  {val.channel_list.map((value, ind) => {
                                    const selected: boolean = value.id === selectedPaymentMethod?.id
                                    const chargeTotal = selectedProduct === undefined ? 0
                                        : value.charge < 1 ? selectedProduct.price + Math.round(selectedProduct.price * value.charge)
                                            : selectedProduct.price + value.charge
                                    return (
                                        <button key={ind} type={"button"}
                                                onClick={() => handleChoosePaymentMethod(value)}
                                                className={`flex flex-col gap-2 rounded-[8px] hover:border-2 border-primary h-fit m-0.5 hover:m-0 px-4 py-2 bg-[#C7C7C7] text-black`}>
                                          <div
                                              className={"flex flex-row justify-evenly items-center w-full"}>
                                            <div className={"w-1/2 h-8 bg-black"}>image
                                            </div>
                                            <h1 className={"w-full h-2/3 text-[16px]"}>
                                              {formatRP(chargeTotal)}
                                            </h1>
                                          </div>
                                          <LineBreak/>
                                          <h2 className={" w-full text-left"}>{value.name}</h2>
                                        </button>
                                    )
                                  })}
                                </div>
                              </AccordionContent>
                              <div className={"border-t border-inactive-text "}>
                                <AccordionTrigger className={"mx-4 text-sm text-inactive-text"}>GOPAY
                                  DANA OVO SHOPEEPAY LINKAJA</AccordionTrigger>
                              </div>
                            </div>
                          </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
                <div id={"email"} className={"flex flex-col gap-8 bg-secondary rounded-[12px]"}>
                  <div className={"relative flex flex-row gap-10 items-center"}>
                    <div
                        className={"absolute flex justify-center items-center left-4 -top-4 md:left-5 md:-top-5 w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary text-white text-center"}>
                      <h1 className={"flex justify-center items-center w-10 h-10 rounded-full text-center bg-primary"}>4</h1>
                    </div>
                    <h2 className={"relative font-bold left-20 md:left-24 mt-2 text-xl md:text-2xl"}>Masukan info kontak</h2>
                  </div>
                  <div className={"flex flex-col gap-3 px-6 pb-6"}>
                    <Label className={"hidden md:block md:text-xl"}>Email</Label>
                    <input type={"email"}
                           name={"email"}
                           className={"px-5 py-3 outline-none rounded-[8px] focus:outline-primary bg-[#191D24]"}
                           placeholder={"Masukan Email"}/>
                    <p className={"text-sm text-inactive-text"}>*Kamu bisa isi jika kamu mau terima
                      bukti transaksi</p>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
          </main>
          <div className={"bg-transparent w-full h-20 border-b border-secondary"}>
          </div>
          <div
              className={"fixed left-0 bottom-0 z-[1000] flex justify-center items-center bg-[#20242D] gap-40 w-full h-20 text-white border-b border-secondary"}>
            <div>
              <h2 className={"font-bold"}>{totalCharge ? formatRP(totalCharge) : "Rp. 0"}</h2>
              <p className={"text-inactive-text"}>{selectedProduct ? selectedProduct.name : "Product"} - {selectedPaymentMethod ? selectedPaymentMethod.name : "Payment Method"}</p>
            </div>
            <div>
              <AlertDialog open={showPaymentDescription}>
                <button className={"bg-primary py-2 px-8 rounded-[8px] font-bold"}
                        type={"submit"}>
                  Bayar Sekarang
                </button>
                <AlertDialogContent className={"bg-[#20242D] border-none p-0 text-white"}>
                  <AlertDialogHeader className={"border-b border-b-inactive-text px-5 py-6"}>
                    <AlertDialogTitle className={"text-xl"}>Detail Pemesanan</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className={"flex flex-col gap-4 px-5 py-2"}>
                    <h3 className={"text-white font-bold"}>Mohon Konfirmasi bahwa kredensial Anda sudah benar</h3>
                    <ul className={"flex flex-col gap-2"}>
                      {formatForm?.map((val, idx) => (
                          <li key={idx} className={"flex flex-row justify-between"}>
                            <p className={"text-inactive-text"}>{val.label}</p>
                            {/*@ts-ignore*/}
                            <p>{formPayload.get(val.name)}</p>
                          </li>
                      ))}
                      <li className={"flex flex-row justify-between"}>
                        <p className={"text-inactive-text"}>Email (optional)</p>
                        {/*@ts-ignore*/}
                        <p>{formPayload.get("email") ? formPayload.get("email") : "-"}</p>
                      </li>
                      <li className={"flex flex-row justify-between"}>
                        <p className={"text-inactive-text"}>Product</p>
                        <p>{selectedProduct?.name}</p>
                      </li>
                      <li className={"flex flex-row justify-between"}>
                        <p className={"text-inactive-text"}>Payment Methods</p>
                        <p>{selectedPaymentMethod?.name}</p>
                      </li>
                      <li className={"border-y border-inactive-text w-full"}></li>
                      <li className={"flex flex-row justify-between"}>
                        <p className={"text-xl font-bold"}>Total Bayar</p>
                        <p>{formatRP(totalCharge)}</p>
                      </li>
                    </ul>
                  </div>
                  <div className={"flex flex-row items-center justify-center"}>
                    <button className={"w-full p-4 m-4 rounded-[8px] bg-[#303745] text-xl font-bold"} type={"button"}
                            onClick={() => setShowPaymentDescription(false)}>
                      Cancel
                    </button>
                    <button className={"w-full p-4 m-4 rounded-[8px] bg-primary text-xl font-bold"} type={"button"}
                            onClick={handleForm}>
                      Bayar
                    </button>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </form>
        <Toaster/>
      </>
};