import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { screens } from "tailwindcss/defaultTheme";

// Import Swiper styles
import "./BannerCarousel.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
const BannerCarousel = () => {
  return (
    <div className="w-full md:min-w-[1280px] md:mx-auto md:px-10 ">
      <div className=" banner-container mb-4 grid-cols-5 gap-4 md:flex mt-4 sm:w-full sm:grid-cols-1 sm:px-2">
        <div className=" md:w-3/5">
          <Swiper
            className="banner-swiper-container"
            modules={[A11y, Navigation, Pagination, Scrollbar]}
            navigation={{
              el: ".swiper-pagination",
              prevEl: ".swiper-button-prev", // CSS selector của nút prev
              nextEl: ".swiper-button-next", // CSS selector của nút next
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              [screens.sm]: {
                navigation: false,
              },
            }}
          >
            <SwiperSlide>
              <img
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1610x492_acc5c5c31e.jpg"
                alt=""
                className=" max-h-96"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1610x492_3_f99d45a2e1.jpg"
                alt=""
                className=" max-h-96"
              />
            </SwiperSlide>

            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        </div>
        <div className=" w-2/5 sm:hidden">
          <img
            className="sub-banner"
            src="https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/1350_LC_5eb5a5953f.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
