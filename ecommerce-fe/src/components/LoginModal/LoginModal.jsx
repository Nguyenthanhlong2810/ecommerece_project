import React from "react";
import Modal from "react-modal";
import "./LoginModal.css";
import fbSvg from "../../assets/icon-facebook.svg";
import ggSvg from "../../assets/icon-google.svg";
import { useState, useEffect } from "react";
import { UserAPI } from "../../apis/user/UserAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { localStorageHelper } from "../../helpers";
import { LOCAL_STORE } from "../../const/system.const.js";
import { COMMON_VALIDATION, COMMON_MESSAGE } from "../../const/Const.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MyErrorMessage from "../MyErrorMessage/MyErrorMessage.jsx";
import * as Yup from "yup";
Modal.setAppElement("#root");

const LOGIN_STATUS = {
  CHECK_EMAIL: "CHECK_EMAIL",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};
const LoginModal = ({ onRequestClose, isOpen, onAfterOpen }) => {
  const [emailValue, setEmailValue] = useState("");
  const initialValue = {
    email: emailValue,
    password: "",
    reTypePassword: "",
    name: "",
    phoneNumber: "",
  };

  const validationLoginForm = {
    email: Yup.string().email(COMMON_MESSAGE.invalidEmail),
    password: COMMON_VALIDATION.requireField,
  };
  const validationRegisterForm = {
    email: Yup.string().email(COMMON_MESSAGE.invalidEmail),
    password: COMMON_VALIDATION.requireField,
    reTypePassword: COMMON_VALIDATION.requireField,
    name: COMMON_VALIDATION.requireField,
    phoneNumber: COMMON_VALIDATION.phoneValidation,
  };

  const [modals, setModals] = useState(LOGIN_STATUS.CHECK_EMAIL);
  const continueBtn = async (values) => {
    try {
      setEmailValue(values.email);
      let checkEmailRequest = {
        email: values.email,
      };

      const response = await UserAPI.checkEmail(checkEmailRequest);
      const result = response.data.result;
      if (result?.isRegistered) {
        setModals(LOGIN_STATUS.LOGIN);
      } else {
        setModals(LOGIN_STATUS.REGISTER);
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.email);
      console.error("Error fetching data:", error);
    } finally {
      // hideLoading();
      // clearTimeout(debounceRef.current);
    }
  };

  const backBtn = () => {
    setModals(LOGIN_STATUS.CHECK_EMAIL);
  };

  const handleLogin = async (values, setFieldError) => {
    const loginRequest = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await UserAPI.login(loginRequest);
      const data = response.data;
      const accessToken = {
        value: data.result,
      };
      localStorageHelper.setItem(LOCAL_STORE.TOKEN, accessToken);
      console.log(localStorageHelper.getItem(LOCAL_STORE.TOKEN));
      onRequestClose();
      toast.success(data.message);
    } catch (error) {
      localStorageHelper.removeItem(LOCAL_STORE.TOKEN);
      setFieldError("password", error?.response?.data?.errors);
    } finally {
      // hideLoading();
      // clearTimeout(debounceRef.current);
    }
  };
  const handleRegister = async (values) => {
    const registerRequest = {
      email: values.email,
      password: values.password,
      reTypePassword: values.reTypePassword,
      phone: values.phone,
      name: values.name,
    };
    try {
      const response = await UserAPI.register(registerRequest);
      const data = response.data;
      onRequestClose();
      toast.success(data.message);
    } catch (error) {
      console.log("Lỗi", error);
      toast.error("Có lỗi xảy ra");
    } finally {
      // hideLoading();
      // clearTimeout(debounceRef.current);
    }
  };

  const loginWithGoogle = async () => {
    const data = await UserAPI.loginByGoogle();
    window.location.href = data?.data?.result?.redirectUrl;
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        contentLabel="Login Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="login-container relative ">
          {modals === LOGIN_STATUS.CHECK_EMAIL && (
            <div>
              <div className=" mt-16 text-xl font-bold text-center">
                Đăng nhập hoặc đăng ký
              </div>
              <Formik
                initialValues={{
                  email: emailValue,
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .required(COMMON_MESSAGE.required)
                    .email(COMMON_MESSAGE.invalidEmail),
                })}
                onSubmit={(values) => {
                  continueBtn(values);
                }}
              >
                <Form>
                  <div className="mx-10 mt-10">
                    <Field
                      type="text"
                      placeholder="Nhập email"
                      name="email"
                      className=" py-4 px-4 border border-gray-200 rounded-xl w-full focus:outline-blue"
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <MyErrorMessage msg={msg}></MyErrorMessage>
                      )}
                    />
                    <button
                      type="submit"
                      className=" text-center w-full mt-4 border rounded-3xl bg-blue text-white py-4 "
                    >
                      Tiếp tục
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          )}

          {modals === LOGIN_STATUS.LOGIN && (
            <div>
              <div className=" mt-16 text-xl font-bold text-center">
                Đăng nhập
              </div>
              <Formik
                initialValues={initialValue}
                validationSchema={Yup.object(validationLoginForm)}
                onSubmit={(values, { setFieldError }) => {
                  handleLogin(values, setFieldError);
                }}
              >
                <Form>
                  <div className="mx-2 mt-2">
                    <div>
                      <Field
                        type="text"
                        placeholder="Nhập email"
                        name="email"
                        readOnly
                        className=" my-2 py-4 px-4 border border-gray-200 rounded-xl w-full outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <MyErrorMessage msg={msg}></MyErrorMessage>
                        )}
                      />
                    </div>
                    <div className="">
                      <Field
                        type="password"
                        placeholder="Nhập password"
                        name="password"
                        className=" my-2 py-4 px-4 border border-gray-200 rounded-xl w-full focus:outline-blue"
                      />
                      <ErrorMessage
                        name="password"
                        render={(msg) => (
                          <MyErrorMessage msg={msg}></MyErrorMessage>
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      className=" text-center w-full mt-2 border rounded-3xl bg-blue text-white py-3 "
                    >
                      Đăng nhập
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          )}

          {modals === LOGIN_STATUS.REGISTER && (
            <div>
              <div className=" mt-16 text-xl font-bold text-center">
                Đăng ký
              </div>
              <Formik
                initialValues={initialValue}
                validationSchema={Yup.object(validationRegisterForm)}
                onSubmit={(values) => {
                  handleRegister(values);
                }}
              >
                <Form>
                  <div className="mx-2 mt-2">
                    <div>
                      <Field
                        type="text"
                        placeholder="Nhập email"
                        name="email"
                        readOnly
                        className=" my-2 py-4 px-4 border border-gray-200 rounded-xl w-full outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <MyErrorMessage msg={msg}></MyErrorMessage>
                        )}
                      />
                    </div>
                    <div className="">
                      <Field
                        type="password"
                        placeholder="Nhập password"
                        name="password"
                        className=" my-2 py-4 px-4 border border-gray-200 rounded-xl w-full focus:outline-blue"
                      />
                      <ErrorMessage
                        name="password"
                        render={(msg) => (
                          <MyErrorMessage msg={msg}></MyErrorMessage>
                        )}
                      />
                    </div>

                    <div>
                      <div>
                        <Field
                          type="password"
                          placeholder="Nhập lại password"
                          name="reTypePassword"
                          className=" my-2 py-4 px-4 border border-gray-200 rounded-xl w-full focus:outline-blue"
                        />
                        <ErrorMessage
                          name="reTypePassword"
                          render={(msg) => (
                            <MyErrorMessage msg={msg}></MyErrorMessage>
                          )}
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          placeholder="Nhập tên của bạn"
                          name="name"
                          className=" my-2 py-4 px-4 border border-gray-200 rounded-xl w-full focus:outline-blue"
                        />
                        <ErrorMessage
                          name="name"
                          render={(msg) => (
                            <MyErrorMessage msg={msg}></MyErrorMessage>
                          )}
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          placeholder="Nhập số điện thoại"
                          name="phoneNumber"
                          className=" my-2 py-4 px-4 border border-gray-200 rounded-xl w-full focus:outline-blue"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          render={(msg) => (
                            <MyErrorMessage msg={msg}></MyErrorMessage>
                          )}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className=" text-center w-full mt-2 border rounded-3xl bg-blue text-white py-3 "
                    >
                      Đăng ký
                    </button>
                  </div>
                </Form>
              </Formik>
              <div className="close-btn">
                <button className="text-sm" onClick={onRequestClose}>
                  Đóng
                </button>
              </div>
              <div className="back-btn">
                <button className="text-sm" onClick={backBtn}>
                  Quay lại
                </button>
              </div>
            </div>
          )}

          {/* Dang nhap bang google */}
          <div>
            <div className=" mt-6 w-full text-center text-gray-600 font-thin">
              hoặc đăng nhập bằng
            </div>
            <div className=" mt-6 flex w-full items-center justify-center">
              <button className="mx-2 border rounded-full px-2 py-2">
                <img src={fbSvg} alt="" />
              </button>

              <button
                className="mx-2 border rounded-full px-2 py-2"
                onClick={loginWithGoogle}
              >
                <img src={ggSvg} alt="" />
              </button>
            </div>
          </div>

          <div className="back-btn">
            <button
              className={`${
                modals === LOGIN_STATUS.CHECK_EMAIL ? "hidden" : ""
              } text-sm`}
              onClick={backBtn}
            >
              Quay lại
            </button>
          </div>
          <div className="close-btn">
            <button onClick={onRequestClose}>Đóng</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
