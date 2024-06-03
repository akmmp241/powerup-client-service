import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const Faqs = () => {
  return (
      <div className={"flex flex-col md:flex-row gap-16 w-full p-2"}>
        <div className={"basis-1/3"}>
          <h1 className={"text-3xl text-center md:text-left font-bold mb-3"}>FAQs</h1>
          <p className={"text-justify md:text-left font-medium"}>Jika pertanyaan Anda tidak terjawab di sini, jangan
            ragu untuk menghubungi tim dukungan pelanggan
            kami untuk bantuan lebih lanjut, Kami pasti melayani anda</p>
        </div>
        <div className={"basis-2/3"}>
          <Accordion type="single" collapsible>
            <AccordionItem className={"border-y-secondary"} value="item-1">
              <AccordionTrigger className={"text-[20px]"}>Apa itu PowerUp?</AccordionTrigger>
              <AccordionContent>
                PowerUp adalah platform top up yang menyediakan layanan pengisian saldo cepat dan aman untuk berbagai
                kebutuhan, termasuk pulsa, data internet, dan layanan lainnya.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className={"border-y-secondary"} value="item-2">
              <AccordionTrigger className={"text-[20px]"}>Bagaimana Cara Menggunakan PowerUp?</AccordionTrigger>
              <AccordionContent>
                PowerUp adalah platform top up yang menyediakan layanan pengisian saldo cepat dan aman untuk berbagai
                kebutuhan, termasuk pulsa, data internet, dan layanan lainnya.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className={"border-y-secondary"} value="item-3">
              <AccordionTrigger className={"text-[20px]"}>Berapa lama waktu untuk top up diproses?</AccordionTrigger>
              <AccordionContent>
                PowerUp adalah platform top up yang menyediakan layanan pengisian saldo cepat dan aman untuk berbagai
                kebutuhan, termasuk pulsa, data internet, dan layanan lainnya.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className={"border-y-secondary"} value="item-4">
              <AccordionTrigger className={"text-[20px]"}>Apakah PowerUp Menjamin Keamanan Transaksi?</AccordionTrigger>
              <AccordionContent>
                PowerUp adalah platform top up yang menyediakan layanan pengisian saldo cepat dan aman untuk berbagai
                kebutuhan, termasuk pulsa, data internet, dan layanan lainnya.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className={"border-y-secondary"} value="item-5">
              <AccordionTrigger className={"text-[20px]"}>Bisakah Saya Melacak Riwayat Transaksi
                Saya?</AccordionTrigger>
              <AccordionContent>
                PowerUp adalah platform top up yang menyediakan layanan pengisian saldo cepat dan aman untuk berbagai
                kebutuhan, termasuk pulsa, data internet, dan layanan lainnya.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className={"border-y-secondary"} value="item-6">
              <AccordionTrigger className={"text-[20px]"}>Bisakah memberi saran tentang layanan
                PowerUp?</AccordionTrigger>
              <AccordionContent>
                PowerUp adalah platform top up yang menyediakan layanan pengisian saldo cepat dan aman untuk berbagai
                kebutuhan, termasuk pulsa, data internet, dan layanan lainnya.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
  )
}

export default Faqs