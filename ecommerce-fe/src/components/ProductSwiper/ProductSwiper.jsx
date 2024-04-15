import React from "react";
import qualitySvg from "../../assets/quality.svg";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "../ProductCard/ProductCard";

const ProductSwiper = ({ title, svgImg, products }) => {
  return (
    <div className=" sm:hidden section mt-20 text-black  ">
      <div className="">
        <div className=" flex h-14 items-center">
          <img
            src={svgImg !== null ? svgImg : qualitySvg}
            alt="/qualitySvg"
            className=" h-full"
          />
          <h1 className=" text-2xl font-semibold ml-4">{title}</h1>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          modules={[A11y, Navigation, Pagination]}
          navigation={{
            prevEl: ".swiper-button-prev", // CSS selector của nút prev
            nextEl: ".swiper-button-next", // CSS selector của nút next
          }}
        >
          {products?.map((prod) => (
            <SwiperSlide key={prod.id}>
              <ProductCard product={prod}></ProductCard>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSwiper;
