import React from "react";
import "./ProductCard.css";
import { formatCurrency } from "../../helpers";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const maxLength = 80; // Đặt chiều dài tối đa bạn muốn

  const truncatedName =
    product.name.length > maxLength
      ? product.name.substring(0, maxLength - 3) + "..."
      : product.name;

  const formattedPrice = formatCurrency(product.price);
  var imageDataUrl = product?.imgUrl;
  // const file1 = product?.files?.[0];
  // const imgByte = file1?.imgByte;
  // var imageDataUrl = null;
  // if (file1?.storageType === STORAGE_TYPE.SERVER) {
  //   imageDataUrl = `data:image/jpeg;base64,${imgByte}`;
  // } else {
  //   imageDataUrl = file1?.url;
  // }

  return (
    <div className=" mx-4 flex flex-col justify-center items-center md:my-5 bg-white border rounded-2xl hover:border-blue relative">
      <div>
        <Link to={`/product/${product?.slug}`}>
          <div className="flex flex-col items-center justify-center">
            <div className="sale-container ">-20%</div>
            <div className=" flex justify-center items-center py-4 h-44 w-36">
              <img
                src={imageDataUrl}
                alt=""
                className=" object-fit w-full h-full rounded-xl"
              />
            </div>
            <div className="font-sx text-center px-2 py-4">
              <div className="mx-1 product-title">{truncatedName}</div>
              <div className="my-2">{product.brand}</div>
              <div className="mt-10 mb-2 text-xl text-blue">
                {formattedPrice}
              </div>
            </div>
          </div>
        </Link>
      </div>
      {/* {product?.isSaled && <div className="sale-container ">-20%</div>} */}
    </div>
  );
};

export default ProductCard;
