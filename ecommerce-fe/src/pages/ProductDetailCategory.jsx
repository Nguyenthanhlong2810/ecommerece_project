import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductAPI } from "../apis/product/ProductAPI";
import { CategoryAPI } from "../apis/category/CategoryAPI";
import FilterProduct from "../components/FilterProduct/FilterProduct";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { selectCategoryItems } from "../redux/categorySlice";
import { useSelector } from "react-redux";
import { CommonLayout } from "../layouts/common";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SORT_BY } from "../const/Const";

const ProductCategory = () => {
  const categories = useSelector(selectCategoryItems);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();

  const { slug } = useParams();

  const [parentCategory, setParentCategory] = useState();

  useEffect(() => {
    console.log("here");
    const result = categories?.find((c) => c.slug === slug);
    const categoryId = result?.id;
    const parentId = result?.parentId;
    const parentCategory = categories?.find((c) => c.id === parentId);
    setParentCategory(parentCategory);

    if (categoryId) {
      fetchCategoryData(categoryId);
    }
    return () => {};
  }, [categories, slug]);

  useEffect(() => {
    if (category) {
      fetchProductData();
    }
  }, [category, slug]);

  const fetchCategoryData = async (categoryId) => {
    try {
      const data = await CategoryAPI.getDetailCategoryById(categoryId);
      setCategory(data?.data?.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProductData = async (classificationDetailIds, sortBy) => {
    try {
      const params = {};
      params.categoryId = category?.id;

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
      <div className="md:mx-40 my-4">
        <div className="sm:mx-4">
          <BreadCrumb></BreadCrumb>
          <h3 className=" text-2xl mb-6">{category?.name}</h3>
          <div className=" py-4 grid md:grid-cols-4 md:gap-10 sm:grid-cols-2 sm:gap-2 sm:text-sm">
            {category?.children?.map((cd) => (
              <a
                href={`/category/${parentCategory.slug}/${category.slug}/${cd.slug}`}
                key={cd.id}
              >
                <div className=" flex w-full h-full bg-white border rounded-2xl p-4 md:text-xl items-center justify-center">
                  <img
                    src={cd?.imgUrl}
                    alt=""
                    className=" min-h-12 w-12 mr-4"
                  />
                  <div>{cd.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <FilterProduct
          filterProduct={fetchProductData}
          products={products}
        ></FilterProduct>
      </div>
    </CommonLayout>
  );
};

export default ProductCategory;
