import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
import bestSvg from "../../assets/best.svg";
import { ProductAPI } from "../../apis/product/ProductAPI";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductAPI.getBestSellerProduct();
        const result = response.data?.result;
        setProducts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const productList = products.slice(0, 12);
  return (
    <div className=" list-container w-full md:min-w-[1280px] ">
      <div className="  rounded-2xl  md:mx-20 md:px-8 sm:mx-10">
        <div className=" flex items-center w-full h-24 justify-center">
          <div>
            <img src={bestSvg} alt="" className="h-14 mr-4" />
          </div>
          <h1 className=" text-lg font-inter font-semibold">
            Sản phẩm bán chạy
          </h1>
        </div>
        <div className=" grid md:grid-cols-5 gap-2 auto-cols-max sm:grid-cols-2">
          {productList.map((prod) => (
            <ProductCard key={prod.id} product={prod}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
