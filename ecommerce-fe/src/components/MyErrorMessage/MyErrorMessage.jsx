import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const MyErrorMessage = ({ msg }) => {
  return (
    <div className=" w-full error text-red-500 py-2 flex items-center">
      <ErrorIcon />
      <span className="ml-2">{msg}</span>
    </div>
  );
};

export default MyErrorMessage;
