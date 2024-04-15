import React, { useEffect, useState } from "react";

import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { selectCategoryItems } from "../../redux/categorySlice";
import { useSelector } from "react-redux";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Breadcrumb = () => {
  const categoryList = useSelector(selectCategoryItems);
  const location = useLocation();

  const categorySlug = location.pathname
    .split("/")
    .filter((x) => !parseInt(x) && x)
    .slice(1);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = () => {
      setCategories(categoryList);
    };
    getCategories();
  }, [categoryList]);

  return (
    <Box my={2}>
      <Breadcrumbs
        // separator={<NavigateNextIcon fontSize="large" />}
        aria-label="breadcrumb"
        sx={{ fontSize: "0.875rem" }}
      >
        <LinkRouter underline="hover" to="/">
          <HomeIcon sx={{ mr: 0.5 }} />
          Trang chủ
        </LinkRouter>
        {categorySlug?.map((slug, index) => {
          const last = index === categorySlug.length - 1;

          const categoryIdsSlice = categorySlug.slice(0, index + 1); // Get category IDs up to the current index
          const to = `/category/${categoryIdsSlice.join("/")}`;
          const breadcrumbText = categories?.find((c) => c.slug === slug)?.name;

          return last ? (
            <Typography color="text.primary" key={to}>
              {breadcrumbText}
            </Typography>
          ) : (
            <a className="text-blue hover:underline" href={to} key={to}>
              {breadcrumbText}
            </a>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
