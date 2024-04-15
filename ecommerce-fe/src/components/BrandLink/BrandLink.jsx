import React from "react";
import logoWhite from "../../assets/logo-white.png";
import { Link } from "react-router-dom";
const BrandLink = ({ classes }) => {
  return (
    <Link
      to="/"
      className={`text-2xl font-base ${classes} font-bold h-4/5 sm:h-16`}
    >
      <img src={logoWhite} className="main-logo w-40 h-full"></img>
    </Link>
  );
};

export default BrandLink;
