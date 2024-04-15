import React, { useEffect, useState } from "react";
import "./BrandDetail.scss";
import { useParams } from "react-router-dom";
import { BrandAPI } from "../../apis/brand/BrandAPI";
import { CommonLayout } from "../../layouts/common";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import { SORT_BY } from "../../const/Const";
import { ProductAPI } from "../../apis/product/ProductAPI";
import BreadcrumbBrand from "./BreadCrumbBrand/BreadCrumbBrand";
const BrandDetail = () => {
  const { brandSlug } = useParams();
  const [brandInfo, setBrandInfo] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getBrandInfo = async () => {
      const res = await BrandAPI.getBrandInfoBySlug(brandSlug);
      const data = res?.data?.result;
      setBrandInfo(data);
    };
    getBrandInfo();
  }, [brandSlug]);

  useEffect(() => {
    if (brandInfo?.id) {
      fetchProductData();
    }
  }, [brandInfo]);

  const fetchProductData = async (classificationDetailIds, sortBy) => {
    try {
      const params = {};
      params.brandId = brandInfo?.id;

      if (classificationDetailIds?.length > 0) {
        params.classificationDetailIds = classificationDetailIds;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      } else {
        params.sortBy = SORT_BY[0]?.key;
      }
      // Convert the params object to a query string
      const queryString = Object.keys(params)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");

      const data = await ProductAPI.search(queryString);
      setProducts(data?.data?.result?.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <CommonLayout>
      <div className="mx-40 mt-4">
        <BreadcrumbBrand brand={brandInfo}></BreadcrumbBrand>

        <div className=" brand-container flex bg-white border rounded-xl justify-items-center items-center mb-10">
          <div className=" flex-4 brand-logo w-24 h-24 md:w-44 md:h-44 mx-4">
            <img
              className=" w-full h-full"
              src={brandInfo?.imgUrl}
              alt={brandInfo.name + " logo"}
            />
          </div>
          <div className=" flex-1 brand-content ">
            <h2 className=" font-bold">{brandInfo.name}</h2>
            <h3 className=" font-light">Thương hiệu</h3>
            <p className=" text-sm"> {brandInfo?.description}</p>
          </div>
        </div>
        <FilterProduct
          products={products}
          filterProduct={fetchProductData}
        ></FilterProduct>
      </div>
    </CommonLayout>
  );
};

export default BrandDetail;
