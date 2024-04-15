// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import React, { Suspense } from "react";
import "./App.css";

import { useEffect } from "react";
import { localStorageHelper } from "./helpers";
import { CartAPI } from "./apis/order/CartAPI";
import { LOCAL_STORE } from "./const/system.const";
import { useDispatch } from "react-redux";
import { getCartItems } from "./redux/cartSlice";
import { getAllCategory } from "./redux/categorySlice";
import LinearDeterminate from "./components/LoadingIndicator/LinearDeterminate";
import { AppRoutes } from "./routes";
import { DialogProvider } from "./hooks/DialogProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const createCartSession = async () => {
      const cartSessionId = JSON.parse(
        localStorageHelper.getItem(LOCAL_STORE.CART_SESSION)
      );
      if (!cartSessionId) {
        try {
          const result = await CartAPI.createCartSession();

          const sessionId = result?.data?.result;
          const cartSession = {
            value: sessionId,
          };
          localStorageHelper.setItem(LOCAL_STORE.CART_SESSION, cartSession);
        } catch (e) {
          console.log(e);
        }
      } else {
        dispatch(getCartItems());
      }
    };
    createCartSession();
  }, []);

  try {
    dispatch(getAllCategory());
  } catch {
    console.log("có lỗi xảy ra khi lấy category");
  }

  return (
    <Router>
      <Suspense fallback={<LinearDeterminate />}>
        <DialogProvider>
          <AppRoutes></AppRoutes>
        </DialogProvider>
      </Suspense>
    </Router>
  );
}

export default App;
