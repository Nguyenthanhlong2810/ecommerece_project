import React, { useEffect, useState } from "react";

import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { selectCategoryItems } from "../../redux/categorySlice";
import { useSelector } from "react-redux";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const BreadcrumbProduct = ({ product }) => {
  const categoryList = useSelector(selectCategoryItems);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    var result = findParents(categoryList, product?.categoryDTO?.id).reverse();
    setCategories(result);
  }, [categoryList]);

  function findParents(list, id) {
    const parents = [];

    // Hàm đệ quy để tìm parent của một id cụ thể
    function findParent(currentId) {
      const item = list.find((item) => item.id === currentId);
      if (item) {
        parents.push(item);
        if (item.parentId !== null) {
          findParent(item.parentId);
        }
      }
    }

    // Tìm kiếm đối tượng có id là id được cung cấp và bắt đầu tìm parent của nó
    findParent(id);

    return parents;
  }

  return (
    <Box my={2} fontSize={16}>
      <Breadcrumbs
        // separator={<NavigateNextIcon fontSize="large" />}
        aria-label="breadcrumb"
        sx={{ fontSize: "0.875rem" }}
      >
        <LinkRouter underline="hover" to="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang chủ
        </LinkRouter>
        {categories?.map((category, index) => {
          const categoryIdsSlice = categories
            .slice(0, index + 1)
            .map((category) => category.slug); // Get category IDs up to the current index
          const to = `/category/${categoryIdsSlice.join("/")}`;
          const breadcrumbText = category.name;

          return (
            <a className="text-blue hover:underline" href={to} key={to}>
              {breadcrumbText}
            </a>
          );
        })}
        <Typography color="text.primary" key={"abcd"}>
          {product.name}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbProduct;
