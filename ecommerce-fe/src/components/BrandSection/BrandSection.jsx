import React, { useEffect, useState } from "react";
import qualitySvg from "../../assets/quality.svg";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { BrandAPI } from "../../apis/brand/BrandAPI";
import BrandCard from "../BrandCard/BrandCard";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

// Import Swiper styles
import "./Brand.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const BrandSection = ({ title, svgImg }) => {
  const [favoriteBrands, setFavoriteBrands] = useState([]);

  const theme = useTheme();

  // Define breakpoints using Material-UI's useMediaQuery
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const getFavoriteBrands = async () => {
      const rs = await BrandAPI.getFavoriteBrands();
      const data = rs?.data?.result;

      setFavoriteBrands(data);
    };
    getFavoriteBrands();
  }, []);
  return (
    <div className=" mt-20 md:min-w-[1280px] ">
      <div className=" section md:mx-40 sm:mx-10 text-black ">
        <div className=" flex h-14 items-center w-full">
          <img
            src={svgImg !== null ? svgImg : qualitySvg}
            alt="/qualitySvg"
            className=" h-full"
          />
          <h1 className=" sm:text-xl md:text-2xl font-bold ml-4">{title}</h1>
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView={isSmScreen ? 1 : 5}
          className=""
          modules={[A11y, Navigation, Pagination]}
          navigation={{
            prevEl: ".swiper-button-prev", // CSS selector của nút prev
            nextEl: ".swiper-button-next", // CSS selector của nút next
          }}
        >
          {favoriteBrands?.map((brand) => (
            <SwiperSlide key={brand.id}>
              <BrandCard brand={brand}></BrandCard>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSection;
