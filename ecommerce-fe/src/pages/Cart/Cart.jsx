import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateQuantity } from "../../redux/cartSlice";
import { formatCurrency } from "../../helpers";
import { CartAPI } from "../../apis/order/CartAPI";
import { toast } from "react-toastify";
import { getCartItems } from "../../redux/cartSlice";
import { CommonLayout } from "../../layouts/common";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MyErrorMessage from "../../components/MyErrorMessage/MyErrorMessage";
import * as Yup from "yup";
import { COMMON_VALIDATION, COMMON_MESSAGE } from "../../const/Const";
import ArrowIcon from "../../components/Icons/Arrow";

const ACTION = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
};
const ORDER_ACTION = {
  VIEW: "VIEW",
  PURCHASE: "PURCHASE",
  COMPLETE: "COMPLETE",
};

const PURCHASE_METHOD = {
  CASH: "CASH",
  MOMO: "MOMO",
  VNPAY: "VNPAY",
};
const Cart = () => {
  const initialValue = {
    namePersonOrder: "",
    email: "",
    phoneNumber: "",
    nameReceiver: "",
    phoneReceiver: "",
    province: "",
    district: "",
    address: "",
    note: "",
    paymentMethod: "",
  };
  const validation = {
    namePersonOrder: COMMON_VALIDATION.requireField,
    email: Yup.string().email(COMMON_MESSAGE.invalidEmail),
    phoneNumber: COMMON_VALIDATION.phoneValidation,
    nameReceiver: COMMON_VALIDATION.requireField,
    phoneReceiver: COMMON_VALIDATION.phoneValidation,
    province: COMMON_VALIDATION.requireField,
    district: COMMON_VALIDATION.requireField,
    address: COMMON_VALIDATION.requireField,
    paymentMethod: Yup.string().required(
      "Vui lòng chọn phương thức thanh toán"
    ),
  };

  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [totalPriceProduct, setTotalPriceProduct] = useState({});
  const [selectChanged, setSelectChanged] = useState(false);
  const cartItemsRedux = useSelector(selectCartItems);
  const [progressOrder, setProgressOrder] = useState(ORDER_ACTION.VIEW);
  const [selectedItems, setSeletedItems] = useState([]);
  const [showDetailPrice, setShowDetailPrice] = useState(false);

  const formikRef = useRef();

  useEffect(() => {
    const initCartItems = () => {
      const data = cartItemsRedux?.map((item) => {
        return {
          ...item,
          selected: false,
          unit: "Hộp",
          totalPrice: item.price * item.quantity,
        };
      });
      setCartItems(data);
    };

    initCartItems();
  }, [cartItemsRedux]);

  const handleSelectAll = (event) => {
    const checkAll = event.target.checked;
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      selected: checkAll,
    }));
    setCartItems(updatedCartItems);
    updateSelectedOrder(updatedCartItems);
    setSelectChanged((prev) => !prev);
  };

  const handleSelectItem = (productId) => {
    const updateSelectedItem = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, selected: !item.selected }
        : item
    );
    setCartItems(updateSelectedItem);
    updateSelectedOrder(updateSelectedItem);

    setSelectChanged((prev) => !prev);
  };

  const handleQuantityChange = (action, itemId) => {
    var updateItem = {};
    const updateQuantityItem = cartItems.map((item) => {
      if (item.productId === itemId) {
        var newQuantity =
          action === ACTION.INCREASE ? item.quantity + 1 : item.quantity - 1;
        updateItem = {
          ...item,
          quantity: newQuantity,
          totalPrice: item.price * newQuantity,
        };
        dispatch(updateQuantity(updateItem));
        return updateItem;
      }
      return item;
    });
    setCartItems(updateQuantityItem);
  };

  useEffect(() => {
    calculatePrice();
  }, [selectChanged]);

  const deleteCartItem = async (itemId) => {
    try {
      await CartAPI.deleteItem(itemId);
      // const data = rs?.data?.result;
      setSelectChanged((prev) => !prev);
      dispatch(getCartItems());
    } catch (e) {
      console.log(e);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const updateSelectedOrder = (items) => {
    var selectedItems = items?.filter((item) => item.selected);
    setSeletedItems(selectedItems);
  };

  const calculatePrice = async () => {
    const selectedItemIds = selectedItems?.map((item) => item.productId);
    try {
      const rs = await CartAPI.calculateTotalPrice(selectedItemIds);
      const data = rs?.data?.result;
      setTotalPriceProduct(data);
    } catch (e) {
      console.log(e);
      toast.error("Có lỗi xảy ra khi tính giá sản phẩm");
    }
  };
  const clickPurchaseOrder = () => {
    if (progressOrder === ORDER_ACTION.VIEW && selectedItems.length > 0) {
      setProgressOrder(ORDER_ACTION.PURCHASE);
    } else if (progressOrder === ORDER_ACTION.PURCHASE) {
      formikRef.current.submitForm();
    }
  };

  const completePurchase = (values) => {
    console.log(selectedItems);
    console.log(values);
  };
  return (
    <CommonLayout>
      <div>
        <div className=" md:mx-40 md:min-w-[1280px]">
          {/* //VIEW_CART */}
          <div
            className={`${
              progressOrder === ORDER_ACTION.VIEW ? "" : " hidden"
            } sm:mx-4`}
          >
            <Breadcrumb></Breadcrumb>
          </div>

          {/* //PURCHASE */}
          <div
            className={`${
              progressOrder === ORDER_ACTION.PURCHASE ? "" : " hidden"
            } `}
          >
            <div className="sm:mx-4 my-2 flex items-center text-blue cursor-pointer">
              <ArrowBackIosNewIcon
                color="primary"
                fontSize="14"
              ></ArrowBackIosNewIcon>
              <div
                className="text-sm ml-4"
                onClick={() => {
                  setProgressOrder(ORDER_ACTION.VIEW);
                }}
              >
                Quay lại giỏ hàng
              </div>
            </div>
            <div className="my-4 text-sm sm:mx-4">
              Danh sách sản phẩm <span>({selectedItems.length})</span>
            </div>
          </div>

          <div className=" flex">
            {/* //  VIEW */}
            <div
              className={`${
                progressOrder === ORDER_ACTION.VIEW ? "" : " hidden"
              } md:w-2/3 sm:w-full border `}
            >
              <div className=" md:rounded-3xl  bg-white py-2">
                <div className="mx-4 my-4">
                  <label>
                    <input
                      className=" mr-4  w-4 h-4 cursor-pointer"
                      type="checkbox"
                      name="selectAll"
                      onChange={(event) => handleSelectAll(event)}
                    />
                    Chọn tất cả
                  </label>

                  <ul>
                    {cartItems?.map((item) => (
                      <li key={item.productId}>
                        <div className=" flex items-center">
                          <div className=" flex items-center w-1/5">
                            <label>
                              <input
                                className="mr-4 w-4 h-4 cursor-pointer"
                                type="checkbox"
                                name="itemSelection"
                                checked={item.selected}
                                onChange={() =>
                                  handleSelectItem(item.productId)
                                }
                              />
                            </label>
                            <img
                              className=" h-20 w-20 mx-2 my-4 border rounded-xl "
                              src={item.url}
                              alt=""
                            />
                          </div>
                          <div className="sm:flex-col flex w-4/5 justify-between md:items-center mx-2">
                            <div className="sm:w-full text-sm sm:my-2">
                              {item.productName}
                            </div>
                            <div className=" sm:text-sm text-blue text-lg sm:my-2">
                              {formatCurrency(item.totalPrice)}
                            </div>
                            <div className="flex gap-2 ml-2">
                              <div>
                                <div className=" flex">
                                  <button
                                    className="border border-gray-300 rounded-l-full py-1 px-4 text-lg"
                                    onClick={() =>
                                      handleQuantityChange(
                                        ACTION.DECREASE,
                                        item.productId
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    value={item.quantity}
                                    readOnly
                                    type="text"
                                    className=" w-12 border-t border-b border-gray-300 text-center"
                                  />
                                  <button
                                    className="border border-gray-300 rounded-r-full py-1 px-4 text-xl"
                                    onClick={() =>
                                      handleQuantityChange(
                                        ACTION.INCREASE,
                                        item.productId
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="border border-gray-300 rounded-full py-2 px-6 text-sm">
                                {item.unit}
                              </div>
                            </div>
                          </div>
                          <button
                            className="mx-4"
                            onClick={() => deleteCartItem(item.productId)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.4"
                              stroke="gray"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                        <hr className=" border my-4 border-gray-200 w-full" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* //PURCHASE */}
            <div
              className={`${
                progressOrder === ORDER_ACTION.PURCHASE ? "" : " hidden"
              } md:w-2/3 sm:w-full border `}
            >
              <div className=" md:rounded-3xl bg-white py-2">
                <div className="mx-4 my-4">
                  <ul>
                    {selectedItems?.map((item) => (
                      <li key={item.productId}>
                        <div className=" flex items-center">
                          <div className=" flex items-center flex-2">
                            <img
                              className=" h-20 w-20 mx-2 my-4 border rounded-xl "
                              src={item.url}
                              alt=""
                            />
                          </div>
                          <div className="sm:flex-col flex flex-1 justify-between md:items-center mx-2">
                            <div className="sm:w-full text-sm sm:my-2">
                              {item.productName}
                            </div>
                          </div>
                          <div className="flex-1 text-lg sm:my-2 flex justify-end items-center gap-4">
                            <div className="text-sm text-black font-semibold ">
                              {formatCurrency(item.totalPrice)}
                            </div>
                            <div className="py-2 px-6 text-sm text-gray-500">
                              <span>x{item.quantity}</span> {item.unit}
                            </div>
                          </div>
                        </div>
                        <hr className=" border my-4 border-gray-200 w-full" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="my-2 text-sm">
                <div className="flex items-center">
                  <div className="flex-1 font-semibold">
                    Chọn hình thức nhận hàng
                  </div>
                  <div className="flex-1 flex justify-between items-center bg-white border rounded-2xl">
                    <button className="py-2 bg-blue w-full rounded-2xl text-white">
                      Giao hàng tận nơi
                    </button>
                    <button className="py-2  w-full rounded-2xl">
                      Nhận tại nhà
                    </button>
                  </div>
                </div>
                <Formik
                  innerRef={formikRef}
                  initialValues={initialValue}
                  validationSchema={Yup.object(validation)}
                  onSubmit={(values) => {
                    completePurchase(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="bg-white border rounded-2xl px-4 mt-4">
                        {/* Thong tin nguoi dat */}
                        <div>
                          <div className="flex items-center mt-2">
                            <PersonIcon color="primary"></PersonIcon>
                            <div className="ml-2">Thông tin người đặt</div>
                          </div>
                          <div className=" grid grid-cols-2 gap-4 my-4">
                            <div className="w-full">
                              <Field
                                name="namePersonOrder"
                                className={`w-full rounded-xl h-12 outline-none px-4 ${
                                  errors.namePersonOrder &&
                                  touched.namePersonOrder
                                    ? " outline-red-400"
                                    : " border border-gray-300"
                                }`}
                                type="text"
                                placeholder="Họ và tên"
                              />
                              <ErrorMessage
                                name="namePersonOrder"
                                render={(msg) => (
                                  <MyErrorMessage msg={msg}></MyErrorMessage>
                                )}
                              />
                            </div>
                            <div className="w-full">
                              <Field
                                name="phoneNumber"
                                type="phone"
                                placeholder="Số điện thoại"
                                className={`w-full rounded-xl h-12 outline-none px-4 ${
                                  errors.phoneNumber && touched.phoneNumber
                                    ? " outline-red-400"
                                    : " border border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="phoneNumber"
                                render={(msg) => (
                                  <MyErrorMessage msg={msg}></MyErrorMessage>
                                )}
                              />
                            </div>
                          </div>
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email (Không bắt buộc)"
                            className={`w-full rounded-xl h-12 outline-none px-4 ${
                              errors.email && touched.email
                                ? " outline-red-400"
                                : " border border-gray-300"
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            render={(msg) => (
                              <MyErrorMessage msg={msg}></MyErrorMessage>
                            )}
                          />
                        </div>
                        <hr className="border border-gray-200 my-6" />
                        {/* //địa chỉ nhận hàng */}
                        <div>
                          <div className="flex items-center mt-2">
                            <LocationOnIcon color="primary"></LocationOnIcon>
                            <div className="ml-2">Địa chỉ nhận hàng</div>
                          </div>
                          <div className=" grid grid-cols-2 gap-4 my-4">
                            <div className="w-full">
                              <Field
                                name="nameReceiver"
                                placeholder="Họ và tên người nhận"
                                className={`w-full rounded-xl h-12 outline-none px-4 ${
                                  errors.nameReceiver && touched.nameReceiver
                                    ? " outline-red-400"
                                    : " border border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="nameReceiver"
                                render={(msg) => (
                                  <MyErrorMessage msg={msg}></MyErrorMessage>
                                )}
                              />
                            </div>
                            <div className="w-full">
                              <Field
                                name="phoneReceiver"
                                placeholder="Số điện thoại"
                                className={`w-full rounded-xl h-12 outline-none px-4 ${
                                  errors.phoneReceiver && touched.phoneReceiver
                                    ? " outline-red-400"
                                    : " border border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="phoneReceiver"
                                render={(msg) => (
                                  <MyErrorMessage msg={msg}></MyErrorMessage>
                                )}
                              />
                            </div>

                            <div className="w-full">
                              <Field
                                name="district"
                                placeholder="Huyện"
                                className={`w-full rounded-xl h-12 outline-none px-4 ${
                                  errors.district && touched.district
                                    ? " outline-red-400"
                                    : " border border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="district"
                                render={(msg) => (
                                  <MyErrorMessage msg={msg}></MyErrorMessage>
                                )}
                              />
                            </div>
                            <div>
                              <Field
                                name="province"
                                placeholder="Tỉnh / Thành phố"
                                className={`w-full rounded-xl h-12 outline-none px-4 ${
                                  errors.province && touched.province
                                    ? " outline-red-400"
                                    : " border border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="district"
                                render={(msg) => (
                                  <MyErrorMessage msg={msg}></MyErrorMessage>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <Field
                            name="address"
                            className={`w-full rounded-xl h-12 outline-none px-4 ${
                              errors.address && touched.address
                                ? " outline-red-400"
                                : " border border-gray-300"
                            }`}
                            type="text"
                            placeholder="Địa chỉ cụ thể"
                          />
                          <ErrorMessage
                            name="address"
                            render={(msg) => (
                              <MyErrorMessage msg={msg}></MyErrorMessage>
                            )}
                          />
                        </div>

                        <Field
                          name="note"
                          className=" w-full border border-gray-300 rounded-xl h-12 outline-none px-4 my-4"
                          type="text"
                          placeholder="Ghi chú (trước khi giao)"
                        />
                      </div>
                      <div className="my-2 text-sm">
                        <div className="font-semibold mb-2">
                          Chọn hình thức thanh toán
                        </div>
                        <div className="bg-white border rounded-xl">
                          <ul className="ml-4">
                            <li className="py-4 flex items-center">
                              <label htmlFor="cash">
                                <Field
                                  type="radio"
                                  id="cash"
                                  name="paymentMethod"
                                  className="mr-4 w-4 h-4"
                                  value={PURCHASE_METHOD.CASH}
                                />
                                Thanh toán tiền mặt khi nhận hàng
                              </label>
                            </li>
                            <hr className="w-full border border-gray-200" />
                            <li className="py-4 flex items-center">
                              <label htmlFor="momo">
                                <Field
                                  type="radio"
                                  id="momo"
                                  name="paymentMethod"
                                  className="mr-4 w-4 h-4"
                                  value={PURCHASE_METHOD.MOMO}
                                />
                                Thanh toán bằng ví MOMO
                              </label>
                            </li>
                            <hr className="w-full border border-gray-200" />
                            <li className="py-4 flex items-center">
                              <label htmlFor="vnpay">
                                <Field
                                  type="radio"
                                  id="vnpay"
                                  name="paymentMethod"
                                  className="mr-4 w-4 h-4"
                                  value={PURCHASE_METHOD.VNPAY}
                                />
                                Thanh toán bằng thẻ nội địa (VNPay)
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <ErrorMessage
                        name="paymentMethod"
                        render={(msg) => (
                          <MyErrorMessage msg={msg}></MyErrorMessage>
                        )}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* //Detail price */}
            <div className=" sm:fixed sm:bottom-0 md:w-1/3 sm:w-full bg-white md:rounded-3xl sm:rounded-t-2xl md:mx-4 md:h-2/5">
              <div
                className={`detail-price sm:${
                  showDetailPrice ? "show" : "hidden"
                }`}
              >
                <div className=" flex text-xl text-gray-500 justify-between my-4 ">
                  <p className="ml-6">Tổng tiền</p>
                  <p className="mr-6 text-black">
                    {formatCurrency(totalPriceProduct?.totalPrice)}
                  </p>
                </div>
                <div className=" flex text-xl text-gray-500 justify-between my-4 ">
                  <p className="ml-6">Giảm giá trực tiếp</p>
                  <p className="mr-6 text-black">
                    {formatCurrency(totalPriceProduct?.discountDirect)}
                  </p>
                </div>
                <div className=" flex text-xl text-gray-500 justify-between my-4 ">
                  <p className="ml-6">Giảm giá voucher</p>
                  <p className="mr-6 text-black">
                    {formatCurrency(totalPriceProduct?.discountVoucher)}
                  </p>
                </div>
                <div className=" flex text-xl text-gray-500 justify-between my-4 ">
                  <p className="ml-6">Tiết kiệm được</p>
                  <p className="mr-6 text-black">
                    {formatCurrency(totalPriceProduct?.savedMoney)}
                  </p>
                </div>
              </div>

              <hr className=" border-gray-400 my-4 mx-4"></hr>
              <div className=" flex text-xl text-gray-500 justify-between my-4 ">
                <div className="flex justify-center">
                  <p className="mx-6">Tổng</p>
                  <div onClick={() => setShowDetailPrice((prev) => !prev)}>
                    <ArrowIcon
                      subClass={`arrow ${
                        showDetailPrice ? "down" : "up"
                      } md:hidden w-6 h-6`}
                    ></ArrowIcon>
                  </div>
                </div>

                <p className="mr-6 text-3xl text-blue">
                  {formatCurrency(totalPriceProduct?.finalTotalPrice)}
                </p>
              </div>
              <div className=" flex justify-center">
                <button
                  className={`text-xl border ${
                    selectedItems.length >= 0 ? "bg-blue" : "bg-gray-500"
                  }  my-4 py-2 rounded-2xl w-full mx-4 text-white`}
                  onClick={() => clickPurchaseOrder()}
                >
                  {progressOrder === ORDER_ACTION.VIEW
                    ? "Mua hàng"
                    : "Hoàn tất"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Cart;
