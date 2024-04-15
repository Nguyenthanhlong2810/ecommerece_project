import React from "react";
const BrandCard = ({ brand }) => {
  return (
    <div className="flex flex-col justify-center items-center my-5 bg-white border border-gray rounded-2xl hover:border-blue relative">
      <a href={`brand/${brand?.slug}`} className=" w-56 h-80">
        <div>
          <div className="my-6 flex items-center justify-center">
            <img
              src={brand?.representativeProduct}
              alt={brand?.name + "logo"}
              className=" object-contain h-40 w-40 rounded-xl"
            />
          </div>
          <div className=" my-6 flex items-center justify-center mx-6 rounded-lg border border-gray">
            <img
              src={brand?.imgUrl}
              alt={brand?.name + "logo"}
              className=" object-contain w-48 h-16"
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default BrandCard;
