import React from "react";
import "./Footer.css";
import BrandLink from "../BrandLink";

const Footer = () => {
  const links = [
    {
      path: "/about",
      title: "About",
    },
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/contact",
      title: "Contact",
    },
  ];
  return (
    <footer className=" mt-10 bg-blue text-white py-4 border border-gray-300 ">
      <div className=" mt-4 flex justify-between px-20">
        <BrandLink classes="text-yellow"></BrandLink>
        {links.map((link, index) => (
          <a key={index} className=" px-4" href={link.path}>
            {link.title}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
