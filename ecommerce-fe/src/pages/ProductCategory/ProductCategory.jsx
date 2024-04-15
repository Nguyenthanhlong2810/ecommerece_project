import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductAPI } from "../../apis/product/ProductAPI";
import { CategoryAPI } from "../../apis/category/CategoryAPI";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import { Pagination, A11y } from "swiper/modules";
import { selectCategoryItems } from "../../redux/categorySlice";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { CommonLayout } from "../../layouts/common";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./ProductCategory.scss";
import { SORT_BY } from "../../const/Const";
import ArrowIcon from "../../components/Icons/Arrow";

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();

  const { slug } = useParams();
  const categories = useSelector(selectCategoryItems);
  const categoryId = categories?.find((c) => c.slug === slug)?.id;

  useEffect(() => {
    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      fetchProductData();
    }
  }, [category]);

  const fetchCategoryData = async () => {
    try {
      const data = await CategoryAPI.getDetailCategoryById(categoryId);
      const category = data?.data?.result;
      const handleCategory = {
        ...category,
        children: category?.children?.map((c) => {
          return {
            ...c,
            isShow: false,
          };
        }),
      };
      setCategory(handleCategory);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchProductData = async (classificationDetailIds, sortBy) => {
    try {
      const params = {};
      params.categoryId = categoryId;
      //Thêm classificationDetailIds nếu không phải là mảng rỗng
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
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const handleShowCategory = (id) => {
    const handleCategory = {
      ...category,
      children: category?.children?.map((c) => {
        return {
          ...c,
          isShow: c.id === id ? !c.isShow : c.isShow,
        };
      }),
    };
    setCategory(handleCategory);
  };
  return (
    <CommonLayout>
      <div className="md:mx-40 ">
        <div className="sm:mx-10">
          <BreadCrumb></BreadCrumb>
        </div>
        <h3 className=" text-lg sm:mx-10 font-bold my-2">{category?.name}</h3>

        {/* responsive for large screen */}
        <div className="list-swiper sm:hidden">
          <div className=" py-4 grid grid-cols-3 gap-5">
            {category?.children?.map((cd) => (
              <div
                id={cd.id}
                key={cd.id}
                className=" grid grid-cols-5 bg-white border rounded-2xl p-4 text-sm items-center justify-center"
              >
                <div className=" col-span-2 flex flex-col items-center justify-center border-r border-gray-200  ">
                  <Link to={`/category/${category.slug}/${cd.slug}`}>
                    <img src={cd.imgUrl} alt="" className=" h-14 w-14" />
                  </Link>
                  <h4 className=" my-4 font-bold">{cd.name}</h4>
                  <h5>17 san pham</h5>
                </div>
                <div className=" col-span-3 h-full ml-4">
                  <Swiper
                    className="category-swiper"
                    modules={[Pagination, A11y]}
                    pagination={{
                      clickable: true,
                    }}
                  >
                    {chunkArray(cd.children, 2)?.map((chunk, index) => (
                      <SwiperSlide key={`${cd.id} - ${index}`}>
                        {chunk.map((item) => (
                          <div className="py-1" key={item.id}>
                            <Link
                              className=" text-blue no-underline hover:underline"
                              to={`/category/${category.slug}/${cd.slug}/${item.slug}`}
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* sm screen */}
        <div className="md:hidden list-category bg-white w-full">
          <div className="py-2">
            {category?.children?.map((child) => (
              <div key={child.id} className="mx-10 border rounded-2xl my-2 ">
                <div className="flex py-2 items-center justify-between">
                  <Link
                    className=" flex-3 flex w-full"
                    to={`/category/${category.slug}/${child.slug}`}
                  >
                    <div className="category-img flex-3 ">
                      <img
                        src={child?.imgUrl}
                        alt=""
                        className="w-10 h-10 mx-2"
                      />
                    </div>
                    <div className="category-detail mx-2 flex-1 ">
                      <div>
                        <h3 className=" font-bold">{child?.name}</h3>
                        <h4 className="text-sm">17 sản phẩm</h4>
                      </div>
                    </div>
                  </Link>
                  <div
                    className="mx-2 hover:cursor-pointer py-2 px-2"
                    onClick={() => handleShowCategory(child.id)}
                  >
                    <ArrowIcon
                      subClass={`arrow ${
                        child?.isShow ? "down" : "up"
                      } w-4 h-4`}
                    ></ArrowIcon>
                  </div>
                </div>
                {child?.isShow && (
                  <div className="child-level-2 border-t ">
                    {child?.children?.map((c) => (
                      <div className="py-2 mx-16 text-sm">
                        <Link className="text-blue font-semibold">
                          {c.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
