import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { formatCurrency } from "../../helpers";
import { addItemToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import bestSvg from "../../assets/best.svg";
import ProductSwiper from "../../components/ProductSwiper";
import LinearProgress from "@mui/material/LinearProgress";
// Import Swiper styles
import "./ProductDetail.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ProductAPI } from "../../apis/product/ProductAPI";
import { CommonLayout } from "../../layouts/common";
import BreadcrumbProduct from "../../components/BreadCrumbProduct/BreadCrumbProduct";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState({});

  const { productSlug } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const rs = await ProductAPI.getProductInfoBySlug(productSlug);
        const productInfo = rs?.data?.result;
        setProductInfo(productInfo);
        setLoading(false);
      } catch (e) {
        console.log(e);
        toast.error("Có lỗi xảy ra khi lấy thông tin sản phẩm");
        setLoading(false);
      }
    };
    getProductInfo();
  }, [productSlug]);
  const [count, setCount] = useState(1);

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mainSliderRef = useRef(null);

  const handleThumbnailClick = (index) => {
    if (mainSliderRef.current && mainSliderRef.current.swiper) {
      mainSliderRef.current.swiper.slideTo(index);
    }
  };

  const addItem = () => {
    try {
      if (count === 0) {
        toast.info("Số lương sản phẩm phải lớn hơn 0");
      } else {
        const item = {
          productId: productInfo.id,
          productName: productInfo.name,
          price: productInfo.price,
          quantity: count,
        };
        dispatch(addItemToCart(item));
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Smooth scrolling behavior
        });
      }
    } catch (e) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const [activeIndex, setActiveIndex] = useState();

  const [relativeProducts, setRelativeProducts] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await ProductAPI.getBestSellerProduct();
        setRelativeProducts(data?.data?.result);
      };
      fetchData();
    } catch {
      console.log("co loi xay ra khi lay san pham ban chay nhat");
    }
  }, []);

  return loading ? (
    <LinearProgress /> // Show loading indicator while data is being loaded
  ) : (
    productInfo && (
      <CommonLayout>
        <div className=" md:mx-40">
          <div className="sm:mx-4">
            <BreadcrumbProduct product={productInfo}></BreadcrumbProduct>
          </div>
          <div className=" border rounded-2xl bg-white">
            {/* Product Info*/}
            <div className=" md:flex md:mx-20 my-10">
              <div className=" md:w-2/5 sm:w-full md:mr-12">
                <Swiper
                  className="product-detail-swiper"
                  ref={mainSliderRef}
                  modules={[A11y, Navigation, Pagination]}
                  navigation={{
                    prevEl: ".swiper-button-prev", // CSS selector của nút prev
                    nextEl: ".swiper-button-next", // CSS selector của nút next
                  }}
                  onSwiper={(slider) => {
                    setActiveIndex(slider.activeIndex);
                  }}
                  onSlideChange={(slider) => setActiveIndex(slider.activeIndex)}
                >
                  {productInfo?.files?.map((file, index) => (
                    <SwiperSlide key={`${file.id}-${index}`}>
                      <div className="flex justify-center">
                        <img
                          src={file.url}
                          alt={productInfo.name}
                          className=" max-h-96"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                </Swiper>
                <div className="h-10"></div>
                <div className=" sm:hidden flex justify-start">
                  {productInfo?.files?.slice(0, 4)?.map((file, index) => (
                    <div key={file.id}>
                      <div
                        className={` flex flex-col items-center my-5 mx-2 bg-white border rounded-2xl relative ${
                          activeIndex === index ? "border-blue" : ""
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <img
                          src={file.url}
                          alt=""
                          className=" object-fit h-36 w-32 rounded-2xl p-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" md:w-3/5 sm:w-full sm:mx-4">
                {/* Product infor */}
                <div className=" ml-4">
                  <span>
                    Thương hiệu:{" "}
                    <a className=" text-blue" href="/">
                      {productInfo.brand}
                    </a>
                  </span>
                  <h1 className=" mt-2 text-2xl ">{productInfo.name}</h1>
                  <h2 className=" text-5xl mt-6 text-blue">
                    {formatCurrency(productInfo.price)}
                  </h2>
                  <table className="mt-4 table-auto w-full text-base">
                    <tbody>
                      <tr>
                        <td className="py-4">Đơn vị tính</td>
                        <td className="py-4">Hộp</td>
                      </tr>
                      <tr>
                        <td className="py-4">Danh mục</td>
                        <td className="py-4">Vitamin tổng hợp</td>
                      </tr>
                      <tr>
                        <td className="py-4">Quy cách</td>
                        <td className="py-4">Hộp 60 viên</td>
                      </tr>
                      <tr>
                        <td className="py-4">Xuất xứ</td>
                        <td className="py-4">Đức</td>
                      </tr>
                      <tr>
                        <td className="py-4">Nhà sản xuất</td>
                        <td className="py-4">ALPHABET Pharmacy</td>
                      </tr>
                      <tr>
                        <td className="py-4">Nước sản xuất</td>
                        <td className="py-4">Đức</td>
                      </tr>
                      <tr>
                        <td className="py-4">Mô tả ngắn gọn</td>
                        <td className="py-4">
                          {productInfo?.shortDescription}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <div className=" flex  mt-4">
              <h2 className=" text-2xl">
                Total Price <span className=" ml-32">{productInfo.price}</span>
              </h2>
            </div> */}
                  <div>
                    {/* add to cart */}
                    <div className=" flex items-center mt-5 text-lg">
                      <span>Chọn số lượng</span>
                      <div className=" mt-3 ml-10 flex ">
                        <button
                          className=" py-2 px-10 border border-gray-500 rounded-l-full"
                          onClick={decreaseCount}
                        >
                          -
                        </button>
                        <input
                          className=" w-12 bg-transparent text-center border-gray-500 border-t border-b py-2"
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                        ></input>
                        <button
                          className=" py-2 px-10 border border-gray-500 rounded-r-full"
                          onClick={increaseCount}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className=" mt-10 flex content-between items-center py-6 px-10 mx-2 border
               rounded-full border-solid bg-blue text-white text-xl"
                      onClick={() => addItem()}
                    >
                      Thêm vào giỏ hàng
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className=" ml-6 w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Description */}

          <div className=" mt-10 text-left border rounded-2xl bg-white">
            <div className=" mt-6 grid grid-cols-4 gap-4">
              <div className=" col-span-1 text-lg ml-4">
                <ul>
                  <li
                    className="py-6 border-b hover:cursor-pointer"
                    onClick={() => scrollToElement("desciption")}
                  >
                    Mô tả sản phẩm
                  </li>
                  <li
                    className=" py-6 border-b hover:cursor-pointer"
                    onClick={() => scrollToElement("ingredient")}
                  >
                    Thành phần
                  </li>
                  <li
                    className="py-6 border-b hover:cursor-pointer"
                    onClick={() => scrollToElement("use")}
                  >
                    Công dụng
                  </li>
                  <li
                    className=" py-6 border-b hover:cursor-pointer"
                    onClick={() => scrollToElement("use-manual")}
                  >
                    Cách dùng
                  </li>
                  <li
                    className="py-6 border-b hover:cursor-pointer"
                    onClick={() => scrollToElement("side-effect")}
                  >
                    Tác dụng phụ
                  </li>
                  <li
                    className=" py-6 border-b hover:cursor-pointer"
                    onClick={() => scrollToElement("notice")}
                  >
                    Lưu ý
                  </li>
                  <li
                    onClick={() => scrollToElement("conservation")}
                    className=" py-6 border-b hover:cursor-pointer"
                  >
                    Bảo quản
                  </li>
                </ul>
              </div>
              <div className=" col-span-3 ">
                <div className=" text-4xl mb-4">
                  Sản phẩm viên uống Multi vitas là gì
                </div>
                <div>
                  <h2 id="description" className="my-6">
                    Mô tả sản phẩm
                  </h2>
                  <p>
                    The Retro Barcelona 95/97 HOME Jersey is a classic design
                    for any football fan. The 100% cotton material makes it
                    comfortable and breathable, perfect for wearing on game day.
                    This shirt will make a great addition to any fan’s wardrobe.
                    Brand New with Tags Now on Sale at Only $69.99 Highly
                    breathable fabric helps keep sweat off your skin, so you
                    stay cool and comfortable on the pitch or in the stands.
                    This product is made from 100%-recycled polyester fabric.
                  </p>
                  <h2 id="ingredient" className="my-6">
                    Thành phần
                  </h2>
                  <p>
                    The Retro Barcelona 95/97 HOME Jersey is a classic design
                    for any football fan. The 100% cotton material makes it
                    comfortable and breathable, perfect for wearing on game day.
                    This shirt will make a great addition to any fan’s wardrobe.
                    Brand New with Tags Now on Sale at Only $69.99 Highly
                    breathable fabric helps keep sweat off your skin, so you
                    stay cool and comfortable on the pitch or in the stands.
                    This product is made from 100%-recycled polyester fabric.
                  </p>
                  <h2 id="use" className="my-6">
                    Công dụng
                  </h2>
                  <p>
                    The Retro Barcelona 95/97 HOME Jersey is a classic design
                    for any football fan. The 100% cotton material makes it
                    comfortable and breathable, perfect for wearing on game day.
                    This shirt will make a great addition to any fan’s wardrobe.
                    Brand New with Tags Now on Sale at Only $69.99 Highly
                    breathable fabric helps keep sweat off your skin, so you
                    stay cool and comfortable on the pitch or in the stands.
                    This product is made from 100%-recycled polyester fabric.
                  </p>
                  <h2 id="user-manual" className="my-6">
                    Cách dùng
                  </h2>
                  <p>
                    The Retro Barcelona 95/97 HOME Jersey is a classic design
                    for any football fan. The 100% cotton material makes it
                    comfortable and breathable, perfect for wearing on game day.
                    This shirt will make a great addition to any fan’s wardrobe.
                    Brand New with Tags Now on Sale at Only $69.99 Highly
                    breathable fabric helps keep sweat off your skin, so you
                    stay cool and comfortable on the pitch or in the stands.
                    This product is made from 100%-recycled polyester fabric.
                  </p>
                  <h2 id="side-effect" className="my-6">
                    Tác dụng phụ
                  </h2>
                  <p>ABCD</p>
                  <h2 id="notice" className="my-6">
                    Lưu ý
                  </h2>
                  <p>AHSSS</p>
                  <h2 id="conservation" className="my-6">
                    Bảo quản
                  </h2>
                  <p>AHSSS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Product */}

          <ProductSwiper
            title="Sản phẩm liên quan"
            svgImg={bestSvg}
            products={relativeProducts}
          ></ProductSwiper>

          <div className=" mt-10 text-left border rounded-2xl bg-white">
            <div className="mt-4 ml-4">
              <div className=" text-2xl">
                Đánh giá sản phẩm
                <span className="ml-4 text-xl text-gray-400">
                  (14 đánh giá)
                </span>
              </div>
              <hr className=" my-6 border border-gray-200" />
              <div className=" flex">
                <div className="">
                  <h2 className="text-xl my-4">Trung bình</h2>
                  <div className=" text-5xl my-4">
                    4.6
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  </div>
                  <button className=" border rounded-3xl py-4 px-8 my-4 bg-blue text-white">
                    Gửi đánh giá
                  </button>
                </div>
                <div>
                  <div className=" ml-10 flex items-center w-3/5">
                    <Rating
                      name="text-feedback"
                      value={5}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      className=" py-2"
                    />
                  </div>
                  <div className=" ml-10 flex items-center w-3/5">
                    <Rating
                      name="text-feedback"
                      value={4}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      className=" py-2"
                    />
                  </div>
                  <div className=" ml-10 flex items-center w-3/5">
                    <Rating
                      name="text-feedback"
                      value={3}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      className=" py-2"
                    />
                  </div>
                  <div className=" ml-10 flex items-center w-3/5">
                    <Rating
                      name="text-feedback"
                      value={2}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      className=" py-2"
                    />
                  </div>
                  <div className=" ml-10 flex items-center w-3/5">
                    <Rating
                      name="text-feedback"
                      value={1}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                      className=" py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    )
  );
};

export default ProductDetail;
