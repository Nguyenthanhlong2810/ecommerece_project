import React from "react";
import { useState, useEffect, useLayoutEffect, memo } from "react";
import ArrowIcon from "../Icons/Arrow";
import { TYPE_FILTER } from "../../const/Const";
import { ProductAPI } from "../../apis/product/ProductAPI";
import { SORT_BY } from "../../const/Const";
import ProductCard from "../ProductCard/ProductCard";

import "./FilterProduct.scss";
import FilterIcon from "../Icons/FilterIcon";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneIcon from "@mui/icons-material/Done";

const FilterProduct = memo(({ filterProduct, loading, products }) => {
  const [filters, setFilters] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);

  var classificationDetailIds = [];

  useEffect(() => {
    const getFilterProduct = async () => {
      try {
        const data = await ProductAPI.getFilterProduct();

        const filterRes = data?.data?.result;

        const filterCategories = filterRes?.map((f, index) => {
          return {
            ...f,
            isExpand: index < 2, // Thêm thuộc tính isExpand với giá trị mặc định là false
            detailDTOList: f.detailDTOList.map((detailItem) => ({
              ...detailItem,
              isChecked: false, // Thêm thuộc tính isChecked với giá trị mặc định là false
            })),
          };
        });
        setFilters(filterCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFilterProduct();
  }, []);

  //toggle parent to expand/close
  const toggleFilter = (filter) => {
    setFilters((prevFilters) => {
      const updatedFilters = prevFilters.map((f) =>
        f.id === filter.id ? { ...f, isExpand: !f.isExpand } : f
      );
      return updatedFilters;
    });
  };

  //for large screen, it will search when click to subfilter
  const toggleSubFilterAndSearch = (subFilter) => {
    const updateFilters = handleToggleSubFilter(subFilter);
    classificationDetailIds = updateFilters
      ?.flatMap((category) => category.detailDTOList)
      ?.filter((detailItem) => detailItem.isChecked)
      ?.map((detailItem) => detailItem.id);
    filterProduct(classificationDetailIds, sort);
  };

  //for small screen, it only create filter, have not searched yet
  const toggleSubFilter = (subFilter) => {
    const updateFilters = handleToggleSubFilter(subFilter);
    const checkedFilters = updateFilters
      ?.flatMap((category) => category.detailDTOList)
      ?.filter((detailItem) => detailItem.isChecked);
    setSelectedFilters(checkedFilters);
  };

  //function to ultilize
  const handleToggleSubFilter = (subFilter) => {
    var updateFilters = filters.map((filter) => {
      if (filter.id === subFilter.specificationId) {
        const updatedSubFilters = filter?.detailDTOList.map((sub) => {
          if (sub.id === subFilter.id) {
            return { ...sub, isChecked: !sub.isChecked };
          } else {
            if (filter.typeFilter === TYPE_FILTER.MULTIPLE_CHOICES) {
              return sub;
            } else {
              return { ...sub, isChecked: false };
            }
          }
        });
        return { ...filter, detailDTOList: updatedSubFilters };
      }
      return filter;
    });
    setFilters(updateFilters);
    return updateFilters;
  };

  const [sort, setSort] = useState(SORT_BY[0].key);
  const onSortClick = (key) => {
    setSort(key);
    filterProduct(classificationDetailIds, key);
  };
  const [showSubFilter, setShowSubFilter] = useState(false);
  useLayoutEffect(() => {
    if (showSubFilter) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
    if (!showSubFilter) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [showSubFilter]);

  const onClickSubFilter = () => {
    setShowSubFilter((prev) => !prev);
  };

  const applyFilter = () => {
    classificationDetailIds = selectedFilters
      ?.filter((filter) => filter.isChecked)
      ?.map((filter) => filter.id);
    filterProduct(classificationDetailIds, sort);

    setShowSubFilter(false);
  };

  const resetFilter = () => {
    const filterCategories = filters?.map((f, index) => {
      return {
        ...f,
        isExpand: index < 2, // Thêm thuộc tính isExpand với giá trị mặc định là false
        detailDTOList: f.detailDTOList.map((detailItem) => ({
          ...detailItem,
          isChecked: false, // Thêm thuộc tính isChecked với giá trị mặc định là false
        })),
      };
    });
    setFilters(filterCategories);
    setSelectedFilters([]);
  };
  return (
    <div className=" md:min-w-[1280px] relative">
      {/* submenu filter for sm screen */}
      {showSubFilter && (
        <div className="w-full h-4/5 bg-white z-40 bottom-0 fixed border-t rounded-2xl md:hidden">
          <div className="flex items-center justify-between py-4 border-b">
            <h1 className="flex-1 text-center font-semibold text-lg">
              Bộ lọc nâng cao
            </h1>
            <div
              className="flex-4 py-2 px-2 hover:cursor-pointer"
              onClick={onClickSubFilter}
            >
              <CloseOutlinedIcon></CloseOutlinedIcon>
            </div>
          </div>
          <div className=" py-2 overflow-scroll h-full pb-96">
            {filters?.map((category) => (
              <div key={category.id} className="mx-4 py-2 border-b">
                <div>
                  <h1 className="font-semibold mb-2">{category?.name}</h1>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {category?.detailDTOList?.map((detail) => (
                    <div
                      key={detail.id}
                      className={` relative flex items-center justify-center py-2 border
                        rounded-xl hover:cursor-pointer ${
                          detail?.isChecked ? "border-blue" : " border-gray-400"
                        } `}
                      onClick={() => toggleSubFilter(detail)}
                    >
                      {detail?.name}
                      <div
                        className={` ${
                          detail?.isChecked ? "" : "hidden"
                        } absolute w-0 h-0 border-t-[28px] border-t-blue border-l-[28px] border-l-white border-l-transparent right-0 top-0 text-white bg-blue rounded-tr-lg`}
                      >
                        <DoneIcon
                          className=" absolute -top-[24px] right-[1px]"
                          color="inherit"
                          fontSize="10"
                        ></DoneIcon>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className=" z-50 w-full h-auto bg-white fixed bottom-0 border-t border-gray-400 pb-6 ">
            {selectedFilters?.length > 0 && (
              <div className="flex justify-start items-center my-2 mx-2 flex-wrap gap-2">
                <div>
                  Lọc theo <span> ({selectedFilters?.length})</span>
                </div>
                {selectedFilters?.map((filter) => (
                  <div className=" text-sm py-2 px-2 text-center border rounded-full mx-2 bg-gray-200 flex">
                    <div>{filter.name}</div>
                    <div
                      className="ml-2 hover:cursor-pointer"
                      onClick={() => toggleSubFilter(filter)}
                    >
                      <CloseOutlinedIcon></CloseOutlinedIcon>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center items-center mt-4">
              <button
                className="py-2 mx-2 border rounded-full w-full flex-1 font-semibold bg-blue text-white"
                onClick={() => applyFilter()}
              >
                Áp dụng
              </button>
              <button
                className="py-2 mx-2 border rounded-full w-full flex-1 font-semibold bg-light-blue text-blue"
                onClick={() => resetFilter()}
              >
                Thiết lập lại
              </button>
            </div>
          </div>
        </div>
      )}
      {showSubFilter && <div className="md:hidden filter-overlay"></div>}
      {/* end subfilter */}

      <div className=" md:py-4 grid grid-cols-4 md:gap-5 sm:gap-2 ">
        <div className=" col-span-1 sm:hidden ">
          <div
            id="filter-container-id"
            className="filter-container bg-white border rounded-xl "
          >
            <div className=" flex items-center justify-center py-4">
              <FilterIcon></FilterIcon>
              <div className=" ml-2 text-base font-bold">Bộ lọc nâng cao</div>
            </div>
            <hr className=" mb-2 border border-gray-100" />

            <div>
              <div>
                {filters?.map((filter) => (
                  <div key={filter.id}>
                    <div className=" flex items-center justify-between text-lg py-2 px-6 my-2  ">
                      {filter.name}
                      <button onClick={() => toggleFilter(filter)}>
                        <ArrowIcon></ArrowIcon>
                      </button>
                    </div>
                    {filter.isExpand && (
                      <div className="filter-category">
                        <ul>
                          {filter?.detailDTOList.map((f) => (
                            <li key={f.id} className="mx-6 py-2 text-sm">
                              {filter?.typeFilter === TYPE_FILTER.SELECT_BOX ? (
                                <button
                                  className={`w-full h-16 text-sm font-light border rounded-xl ${
                                    f?.isChecked ? "border-cyan-600" : ""
                                  } `}
                                  onClick={() => toggleSubFilterAndSearch(f)}
                                >
                                  {f.name}
                                </button>
                              ) : (
                                <label className="px-2 py-2">
                                  <input
                                    className="mr-4 w-4 h-4"
                                    type="checkbox"
                                    checked={f.isChecked}
                                    onChange={() => toggleSubFilterAndSearch(f)}
                                  />
                                  {f.name}
                                </label>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <hr className="mx-6 mb-2 border border-gray-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" sm:col-span-4 col-span-3">
          <div className="w-full h-full">
            <div className="sm:bg-white">
              <div className=" md:flex justify-between my-2 items-center sm:w-full">
                <div className="text-lg font-semibold sm:py-2 sm:w-full border-b sm:px-4">
                  Danh sách sản phẩm
                </div>
                <div className=" flex justify-between items-center">
                  <div className="flex items-center md:justify-between sm:justify-start sm:py-4 mx-2">
                    <h2 className="text-sm sm:hidden">Sắp xếp theo</h2>
                    {SORT_BY?.map((s) => (
                      <button
                        key={s?.key}
                        className={`relative py-1 px-6 border text-sm rounded-full ml-2 ${
                          s?.key === sort
                            ? "border-blue text-blue font-semibold"
                            : "border-gray-500"
                        }`}
                        onClick={() => {
                          onSortClick(s?.key);
                        }}
                      >
                        {s?.name}

                        <div
                          className={` ${
                            s?.key === sort ? "" : "hidden"
                          } absolute w-0 h-0 border-t-[20px] border-t-blue border-l-[20px] sm:border-l-white md:border-l-gray-200 border-l-transparent right-0 top-0 text-white bg-blue rounded-tr-xl`}
                        >
                          <DoneIcon
                            className=" absolute -top-[24px] right-[1px]"
                            color="inherit"
                            fontSize="10"
                          ></DoneIcon>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div
                    className="flex mx-2 border-l py-2 px-2 md:hidden"
                    onClick={onClickSubFilter}
                  >
                    <FilterIcon></FilterIcon>
                    <div className="font-semibold ml-2 hover:cursor-pointer">
                      Lọc
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full ">
              {products?.length > 0 ? (
                <div className=" grid md:grid-cols-4 sm:grid-cols-2 md:gap-4 auto-cols-max md:auto-cols-min">
                  {products?.map((prod, key) => (
                    <ProductCard key={key} product={prod}></ProductCard>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex items-center flex-col">
                  <h1 className=" text-2xl mt-20 mb-10">
                    Ôi! Không tìm thấy sản phẩm nào phù hợp
                  </h1>
                  <h2> Hãy thử lại bằng cách thay đổi điều kiện lọc</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FilterProduct;
