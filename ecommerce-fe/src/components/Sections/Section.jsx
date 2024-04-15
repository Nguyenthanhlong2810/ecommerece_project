import React, { useEffect } from "react";
import qualitySvg from "../../assets/quality.svg";
import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { ProductAPI } from "../../apis/product/ProductAPI";
import { CategoryAPI } from "../../apis/category/CategoryAPI";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "../ProductCard/ProductCard";
const Section = ({ title, svgImg }) => {
  const theme = useTheme();

  // Define breakpoints using Material-UI's useMediaQuery
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const rs = await CategoryAPI.getSpecificationSubject();
        const data = rs?.data?.result;
        const handleData = data?.map((data, index) => {
          return {
            ...data,
            isSelected: index === 0 ? true : false,
          };
        });
        setCategories(handleData);
      } catch {
        console.log("co loi xay ra o section");
      }
    };

    getCategories();
  }, []);

  const [product, setProducts] = useState([]);

  const handleChangeCategory = (newCategory) => {
    const result = categories?.map((category) => {
      return {
        ...category,
        isSelected: category.id === newCategory.id ? true : false,
      };
    });
    setCategories(result);
  };

  useEffect(() => {
    const classificationDetail = categories?.filter((c) => c.isSelected)[0];
    if (classificationDetail) {
      const getProductSubject = async () => {
        const params = {
          classificationId: classificationDetail.productClassificationId,
          classificationDetailId: classificationDetail.id,
        };

        const queryString = Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");

        const rs = await ProductAPI.getProductByClassificationDetail(
          queryString
        );
        const data = rs?.data?.result;
        setProducts(data);
      };
      getProductSubject();
    }
  }, [categories]);

  return (
    <div className=" mt-20 md:min-w-[1280px] bg-extra-light-blue">
      <div className=" section text-black sm:mx-10 ">
        <div className=" md:mx-40 w-full">
          <div className=" flex h-14 items-center ">
            <img
              src={svgImg !== null ? svgImg : qualitySvg}
              alt="/qualitySvg"
              className=" h-full"
            />
            <h1 className=" text-2xl font-semibold ml-4">{title}</h1>
          </div>
          {categories !== null && (
            <div className=" w-full flex flex-wrap gap-4 justify-start my-4 py-2">
              {categories?.map((category) => (
                <div
                  key={category.id}
                  className={`px-4 py-2 border rounded-full hover:cursor-pointer ${
                    category.isSelected
                      ? "bg-white text-blue border-blue"
                      : "border-gray-500"
                  }`}
                  onClick={() => handleChangeCategory(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
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
            {product?.map((prod) => (
              <SwiperSlide key={prod.id}>
                <ProductCard product={prod}></ProductCard>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Section;
