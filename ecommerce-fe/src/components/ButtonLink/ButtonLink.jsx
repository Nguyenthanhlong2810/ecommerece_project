import React from "react";
import { Link } from "react-router-dom";
const ButtonLink = ({ props, title, path }) => {
  return (
    <Link
      to={path}
      className={`${props}  py-2 px-10 inline-block bg-transparent border rounded-xl text-sm font-base`}
    >
      {title}
    </Link>
  );
};

export default ButtonLink;
