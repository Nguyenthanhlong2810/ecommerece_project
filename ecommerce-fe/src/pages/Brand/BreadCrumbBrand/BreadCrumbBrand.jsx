import React, { useEffect, useState } from "react";

import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const BreadcrumbBrand = ({ brand }) => {
  return (
    <Box my={2} fontSize={16}>
      <Breadcrumbs
        // separator={<NavigateNextIcon fontSize="large" />}
        aria-label="breadcrumb"
      >
        <LinkRouter underline="hover" to="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang chủ
        </LinkRouter>

        <Typography color="text.primary">{brand?.name}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbBrand;
