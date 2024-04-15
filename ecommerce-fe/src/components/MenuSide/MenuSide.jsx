import React, { useEffect, useLayoutEffect, useState } from "react";
import "./MenuSide.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import logoGreen from "../../assets/logo-green.png";
import { useSelector } from "react-redux";
import ArrowIcon from "../Icons/Arrow";
import { Link } from "react-router-dom";

const MenuSide = ({ onClickLogin, showMenuSide, onClickMenuDetail }) => {
  const categoryItems = useSelector((state) => state.category.items);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const handleItems = () => {
      const data = categoryItems
        ?.filter((item) => !item.parentId)
        .map((item) => {
          return {
            ...item,
            children: categoryItems?.filter((i) => i.parentId === item.id),
            isShow: false,
          };
        });
      setCategories(data);
    };
    handleItems();
  }, [categoryItems]);

  useLayoutEffect(() => {
    if (showMenuSide) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
    if (!showMenuSide) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [showMenuSide]);

  const onClickArrow = (id) => {
    const handleData = categories?.map((category) => {
      if (category.id === id) {
        return {
          ...category,
          isShow: !category.isShow,
        };
      }
      return category;
    });
    setCategories(handleData);
  };
  return (
    <div>
      <div
        className={`menu-list w-72 absolute h-screen top-0 bg-white z-[1000] ${
          showMenuSide ? "visible" : ""
        }`}
      >
        <div className="ml-4 my-4 flex justify-between">
          <img src={logoGreen} className="main-logo w-20 h-14"></img>
          <CloseOutlinedIcon
            className="mr-4"
            onClick={onClickMenuDetail}
          ></CloseOutlinedIcon>
        </div>
        <div className=" bg-blue text-sm">
          <div className="text-white mx-4 py-2 text-xs">
            Đăng nhập để hưởng những ưu đãi thành viên
          </div>
          <div className="flex items-center justify-center pb-3">
            <button
              className="bg-white text-blue rounded-2xl px-2 py-1 mx-2"
              onClick={onClickLogin}
            >
              Đăng nhập
            </button>
            <button className="bg-white text-blue rounded-2xl px-2 py-1 mx-2">
              Đăng ký
            </button>
          </div>
        </div>
        {categories?.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-center py-4 px-2 text-blue font-bold">
              <Link to={`/category/${item.slug}`} className=" mr-2">
                <div className="flex-1">{item.name}</div>
              </Link>
              <div onClick={() => onClickArrow(item.id)} className="">
                <ArrowIcon
                  subClass={`arrow ${item.isShow ? "down" : "up"} w-6 h-6`}
                ></ArrowIcon>
              </div>
            </div>
            {item.isShow && (
              <div className="bg-aliceblue border rounded-2xl mx-4">
                {item?.children?.map((child) => (
                  <Link
                    to={`/category/${item.slug}/${child.slug}`}
                    className="text-blue no-underline"
                    // onClick={() => window.location.reload(true)}
                  >
                    <div
                      key={child.id}
                      className="py-2 px-2 text-sm font-semibold"
                    >
                      {child.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {showMenuSide && <div className="overlay"></div>}
    </div>
  );
};

export default MenuSide;
