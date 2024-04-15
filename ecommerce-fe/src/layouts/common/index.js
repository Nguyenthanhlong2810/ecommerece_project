import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Category from "../../components/Category/Category";
export const CommonLayout = ({ children }) => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Category></Category>
      <div className=" min-w-[400px]">{children}</div>
      <Footer></Footer>
    </div>
  );
};
