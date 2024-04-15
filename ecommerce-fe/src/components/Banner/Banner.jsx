import React from "react";
import "./Banner.css";
const Banner = () => {
  return (
    <div className=" mt-10  md:min-w-[1280px] md:mx-auto md:px-10 h-80 rounded-2xl sm:mx-4">
      <img
        src="https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1610x492_banner_desktop_1_b814a9eaea.png"
        alt="banner-2"
        className=" w-full h-full border rounded-2xl"
      />
    </div>
  );
};

export default Banner;
