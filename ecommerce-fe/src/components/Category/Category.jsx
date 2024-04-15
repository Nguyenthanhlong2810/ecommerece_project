import React, { useEffect } from "react";
import ArrowIcon from "../Icons/Arrow";
import { useState } from "react";
import "./Category.css";
import { CategoryAPI } from "../../apis/category/CategoryAPI";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryAPI.getAllCategory();
        const result = response.data?.result;
        result.forEach((parent) => {
          addIsShowKey(parent);
        });

        setCategories(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {};
  }, []);

  function addIsShowKey(parent) {
    parent.isShow = false;
    parent.children.forEach((child) => {
      addIsShowKey(child);
    });
  }

  const handleMouseEnter = (id) => {
    const updatedCategories = categories.map((cate) => {
      if (cate.id === id) {
        if (cate.children.length > 0) {
          cate.children[0] = {
            ...cate.children[0],
            isShow: true,
          };
        }

        return {
          ...cate,
          isShow: true,
        };
      } else {
        return {
          ...cate,
          isShow: false,
        };
      }
    });
    setCategories(updatedCategories);
  };
  const handleMouseLeave = (id) => {
    const updatedCategories = categories.map((cate) => {
      if (cate.id === id) {
        if (cate.children.length > 0) {
          cate.children[0] = {
            ...cate.children[0],
            isShow: false,
          };
        }
        return {
          ...cate,
          isShow: false,
        };
      }
      return cate;
    });
    setCategories(updatedCategories);
  };

  const handleMouseEnterChildCategory = (id) => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      children: category.children.map((child) => ({
        ...child,
        isShow: child.id === id,
      })),
    }));
    setCategories(updatedCategories);
  };

  const [contentSub, setContentSub] = useState({});

  useEffect(() => {
    const activeCategory = categories.filter((c) => c.isShow);
    if (activeCategory.length > 0) {
      const activeSubCategory = activeCategory[0].children.filter(
        (ct) => ct.isShow
      );
      if (activeSubCategory.length > 0) {
        setContentSub(activeSubCategory[0]);
      }
    }
  }, [categories]);

  return (
    <div className="bg-white md:min-w-[1280px] md:mx-auto md:px-40 sm:hidden ">
      <div className="relative">
        <ul className=" flex justify-around text-sm h-10">
          {categories.map((category) => (
            <li
              className={` flex items-center py-2 w-64 justify-center ${
                category.isShow ? " border-b-2 border-blue" : ""
              } `}
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={() => handleMouseLeave(category.id)}
              key={category.id}
            >
              <Link to={`/category/${category.slug}`} className=" mr-2">
                {category.name}
              </Link>
              <ArrowIcon
                subClass={`arrow ${category.isShow ? "down" : "up"} h-6 w-6`}
              ></ArrowIcon>
              <div className={`sub-menu ${category.isShow ? "show" : ""}`}>
                <div className=" grid grid-cols-6">
                  <div className=" col-span-1 container-sub-level-1">
                    <ul>
                      {category.isShow &&
                        category.children.map((child) => (
                          <div
                            className=" flex "
                            key={child.id}
                            // onClick={onClick}
                          >
                            <li
                              className={`py-2 ${
                                child.isShow ? "bg-aliceblue" : ""
                              }`}
                              onMouseEnter={() =>
                                handleMouseEnterChildCategory(child.id)
                              }
                            >
                              <Link
                                to={`/category/${category.slug}/${child.slug}`}
                                className="text-blue no-underline"
                                // onClick={() => window.location.reload(true)}
                              >
                                <div className=" flex ">
                                  <img
                                    src={child?.imgUrl}
                                    className="w-8 h-8 mr-6"
                                    alt=""
                                  />
                                  <h2>{child.name}</h2>
                                </div>
                              </Link>
                            </li>
                          </div>
                        ))}
                    </ul>
                  </div>
                  <div className=" col-span-5 container-sub-level-2">
                    <div className="content-sub mx-6 my-6">
                      <div className=" grid grid-cols-4 gap-5 ">
                        {contentSub?.children?.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/category/${category.slug}/${contentSub.slug}/${sub?.slug}`}
                          >
                            <div className=" col-span-1 sub-cate flex bg-white border rounded-2xl items-center">
                              <img
                                src={sub?.imgUrl}
                                className=" w-16 h-16 ml-4 my-4 mx-4"
                                alt="sub-cate"
                              />
                              <h2>{sub.name}</h2>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <hr className=" col-span-4 border border-gray-200 my-4" />
                      <div className="">
                        <div className="my-4 flex items-center ">
                          <h2 className=" mx-2 text-xl">Bán chạy nhất</h2>

                          <Link href="" className="mx-2 text-sky-500">
                            Xem tất cả
                          </Link>
                        </div>
                        <div className=" grid grid-cols-5 gap-5">
                          <div className=" col-span-1 sub-cate flex flex-col bg-white border rounded-2xl items-center relative">
                            <div className="sale-container ">-20%</div>
                            <img
                              src="https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00503325_sua_rua_mat_ngua_mun_duong_am_va_lam_sang_da_reihaku_hatomugi_acne_care_and_facial_washing_130g_9270_63ed_large_3f5868bde7.jpg"
                              alt="sub-cate"
                              className=" w-28 h-32 ml-4 my-4"
                            />
                            <h2 className=" my-2">Nước yến</h2>
                            <h2 className=" my-2 text-blue">25.000đ/gói</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
