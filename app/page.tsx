import Navbar from "@/app/components/navbar";
import CarouselSection from "@/app/components/carousel";
import LineBreak from "@/app/components/line";
import Popular from "@/app/components/popular";
import Promo from "@/app/components/promo";
import About from "@/app/components/about";
import Faqs from "@/app/components/Faqs";
import {Suspense} from "react";
import "@/app/register/style.css"
import Footer from "@/app/components/footer";
import ProductSection from "@/app/components/product-section";

export default async function Home() {


  return (
      <>
        <Navbar/>
        <main id={"main"} className={"flex flex-col gap-12 w-full max-w-[1220px] m-auto text-body-text"}>
          <Suspense fallback={"awikwok sangat"}>
            <CarouselSection/>
          </Suspense>
          <LineBreak/>
          <div className={"flex flex-col gap-8 w-full"}>
            <div>
              <h1 className={"text-2xl md:text-3xl text-center md:text-left font-bold mb-3"}>PowerUp Promo Top Up! ⚡</h1>
            </div>
            <Suspense fallback={<h1>Bang loading</h1>}>
              <Promo/>
            </Suspense>
          </div>
          <LineBreak/>
          <div className={"flex flex-col gap-8 w-full"}>
            <div>
              <h1 className={"text-2xl md:text-3xl text-center md:text-left font-bold mb-3"}>Game Terpopuler 🔥</h1>
              <p className={"text-center md:text-left font-medium"}>Top Up Item di Game Favoritmu!</p>
            </div>
            <Suspense fallback={<h1>Loading bang...</h1>}>
              <Popular/>
            </Suspense>
          </div>
          <LineBreak/>
          <ProductSection />
          <LineBreak/>
          <About/>
          <LineBreak/>
          <Faqs/>
          <LineBreak/>
          <Footer/>
        </main>

      </>
  );
}
