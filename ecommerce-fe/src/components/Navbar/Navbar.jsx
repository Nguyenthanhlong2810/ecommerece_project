import React from "react";
import "./Navbar.css";
import "../BrandLink";
import BrandLink from "../BrandLink";
import UserIcon from "../Icons/UserIcon";
import CartIcon from "../Icons/CartIcon";
import SearchBar from "../SearchBar";
import LoginModal from "../LoginModal/LoginModal";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { UserAPI } from "../../apis/user/UserAPI";
import { localStorageHelper } from "../../helpers";
import { LOCAL_STORE } from "../../const/system.const";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuSide from "../MenuSide/MenuSide";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

Modal.setAppElement("#root");
const Navbar = () => {
  const [showMenuSide, setShowMenuSide] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserAPI.getUserInfo();
        setUserInfo(response.data?.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (localStorageHelper.isLogin()) {
      setLogin(true);
      fetchData();
    }
    // Clean-up function (optional) - executed when the component unmounts or just before the effect is re-run
    return () => {
      // Perform any clean-up here if needed
    };
  }, [modalIsOpen]);

  function openModal() {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    document.body.style.overflow = "auto";
    setIsOpen(false);
  }

  function profileUser() {}

  const logout = () => {
    if (localStorageHelper.isLogin()) {
      localStorageHelper.removeItem(LOCAL_STORE.TOKEN);
    }
    //call backend api
    toast.success("Đăng xuất thành công");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const onClickMenuDetail = () => {
    setShowMenuSide((prev) => !prev);
  };

  return (
    <div className="nav-container md:min-w-[1280px] md:mx-auto md:px-16   ">
      <nav className=" flex justify-between h-36 items-center sm:flex-col">
        {/* Brand*/}
        <div className="flex justify-between sm:w-full items-center ">
          <div className="popup-menu md:hidden hover:cursor-pointer relative">
            <div className="ml-4">
              <MenuIcon
                style={{ color: "white", fontSize: "30px" }}
                onClick={onClickMenuDetail}
              ></MenuIcon>
            </div>
            <MenuSide
              onClickLogin={openModal}
              showMenuSide={showMenuSide}
              onClickMenuDetail={onClickMenuDetail}
            ></MenuSide>
          </div>
          <BrandLink classes={` text mx-4 sm:mt-4 `}></BrandLink>
          <Link to={"/cart"}>
            <div className="cart-item mr-4 text-white hover:cursor-pointer md:hidden">
              <ShoppingCartIcon></ShoppingCartIcon>
            </div>
          </Link>
        </div>
        <SearchBar></SearchBar>
        <div className=" flex text-white  w-80 sm:hidden">
          <div className=" flex items-center w-full">
            <div className=" w-1/2 mr-4">
              {isLogin ? (
                <button
                  className=" flex py-4 items-center relative"
                  onClick={profileUser}
                  onMouseEnter={toggleMenu} // Show menu on hover
                  onMouseLeave={toggleMenu} // Hide menu when mouse leaves
                >
                  <UserIcon></UserIcon>

                  <span className=" ml-2">
                    Hi{" "}
                    {userInfo.fullName
                      ? userInfo?.fullName.split(" ")[0]
                      : userInfo?.fullName}
                  </span>
                  <div
                    className={`menu-profile ${
                      isLogin && showMenu ? "show" : ""
                    } `}
                  >
                    <ul>
                      <li className=" flex py-2 items-center">
                        <UserIcon></UserIcon>
                        <h2 className="ml-2">Thông tin cá nhân</h2>
                      </li>
                      <li
                        className="flex py-2 items-center"
                        onClick={() => logout()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-10 h-10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        <h2 className="ml-2"> Đăng xuất</h2>
                      </li>
                    </ul>
                  </div>
                </button>
              ) : (
                <button
                  className=" flex py-4 px-1 items-center"
                  onClick={openModal}
                >
                  <UserIcon></UserIcon>
                  <span className=" ml-2">Đăng nhập</span>
                </button>
              )}
            </div>
            <div className="w-1/2">
              <button
                className=" flex py-1 px-4 items-center bg-blue border rounded-full "
                onClick={() => {
                  window.location.href = "/cart"; // Force full page reload
                }}
              >
                <div className=" relative">
                  {cartItems && cartItems?.length > 0 ? (
                    <div className=" absolute -top-3 -right-1 ">
                      <div className=" bg-orange-400 w-6 h-6 rounded-full flex items-center justify-center">
                        <h3>{cartItems?.length}</h3>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <CartIcon></CartIcon>
                </div>
                <div className=" ml-2 py-2">Giỏ hàng</div>
              </button>
            </div>
          </div>
        </div>
        <LoginModal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        ></LoginModal>
      </nav>
    </div>
  );
};

export default Navbar;
