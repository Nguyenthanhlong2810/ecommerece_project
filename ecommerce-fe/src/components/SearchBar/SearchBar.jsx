import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  // Lấy giá trị của key từ URL khi component được tạo
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyFromURL = searchParams.get("key");
    if (keyFromURL) {
      setSearchKey(keyFromURL);
    }
  }, [location.search]);

  const handleInputChange = (event) => {
    setSearchKey(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchFunction();
    }
  };

  const searchFunction = () => {
    if (searchKey?.trim() !== "") {
      navigate(`/search?key=${searchKey}`);
    }
    // Navigate to the search page with the query parameter
  };
  return (
    <div className="search-bar flex justify-between md:h-[60px] md:w-[600px] border rounded-[40px] text-sm sm:w-5/6 sm:mx-5  ">
      <input
        className="input-search"
        type="text"
        placeholder="Tìm tên sản phẩm, tên thuốc, thực phẩm chức năng"
        value={searchKey}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="button-search md:w-[50px] md:h-[50px] md:px-[10px] md:py-[10px]  sm:h-8 sm:w-8 sm:px-[4px]"
        onClick={searchFunction}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-full h-full "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
