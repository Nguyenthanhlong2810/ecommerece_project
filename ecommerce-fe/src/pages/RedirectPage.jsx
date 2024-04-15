import React, { useEffect } from "react";
import { localStorageHelper } from "../helpers";
import { LOCAL_STORE } from "../const/system.const";
import CircularProgress from "@mui/material/CircularProgress";

const RedirectPage = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("accessToken");
    if (token) {
      localStorageHelper.setItem(LOCAL_STORE.TOKEN, { value: token });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center my-10">
      <p>Đang chuyển hướng về trang chủ...</p>
      <div className="my-4">
        <CircularProgress size={50} />
      </div>
    </div>
  );
};

export default RedirectPage;
