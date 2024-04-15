import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductAPI } from "../apis/product/ProductAPI";
import FilterProduct from "../components/FilterProduct/FilterProduct";
import { SORT_BY } from "../const/Const";
import { CommonLayout } from "../layouts/common";
import CircularProgress from "@mui/material/CircularProgress";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);

  const key = searchParams.get("key") || "";

  const [products, setProducts] = useState();

  useEffect(() => {
    fetchProductData();
  }, [key]);

  const fetchProductData = async (classificationDetailIds, sortBy) => {
    try {
      const params = {};
      // Thêm searchKey nếu key khác rỗng
      if (key.trim() !== "") {
        params.searchKey = key;
      }

      if (sortBy) {
        params.sortBy = sortBy;
      } else {
        params.sortBy = SORT_BY[0]?.key;
      }
      // Thêm classificationDetailIds nếu không phải là mảng rỗng
      if (classificationDetailIds?.length > 0) {
        params.classificationDetailIds = classificationDetailIds;
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <CommonLayout>
      {loading ? (
        <div className="my-4 w-full flex justify-center items-center ">
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className="md:mx-40 my-4">
          <div className="bg-white border rounded-2xl py-4 px-4 text-xl sm:text-sm">
            Tìm thấy <span className="font-semibold"> {products?.length}</span>{" "}
            sản phẩm với từ khóa <span className=" font-semibold">"{key}"</span>
          </div>
          <FilterProduct
            filterProduct={fetchProductData}
            products={products}
          ></FilterProduct>
        </div>
      )}
    </CommonLayout>
  );
};

export default Search;
