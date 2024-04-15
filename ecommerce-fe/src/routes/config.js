import React from "react";
import { ROUTE_PATH } from "../const/system.const";

const HomePage = React.lazy(() => import("../pages/Home"));
const CategoryPage = React.lazy(() =>
  import("../pages/ProductCategory/ProductCategory")
);
const ProductDetailPage = React.lazy(() => import("../pages/ProductDetail"));
const AboutPage = React.lazy(() => import("../pages/About"));
const CartPage = React.lazy(() => import("../pages/Cart/Cart"));
const ProductDetailCategoryPage = React.lazy(() =>
  import("../pages/ProductDetailCategory")
);
const SearchPage = React.lazy(() => import("../pages/Search"));
const BrandDetailPage = React.lazy(() => import("../pages/Brand/BrandDetail"));
const RedirectPage = React.lazy(() => import("../pages/RedirectPage"));

const routesList = [
  { component: HomePage, path: ROUTE_PATH.HOME },
  { component: CartPage, path: ROUTE_PATH.CART },
  { component: CategoryPage, path: ROUTE_PATH.CATEGORY },
  {
    component: ProductDetailPage,
    path: `${ROUTE_PATH.PRODUCT}/:productSlug`,
  },
  { component: AboutPage, path: ROUTE_PATH.ABOUT },
  {
    component: ProductDetailCategoryPage,
    path: `${ROUTE_PATH.DETAIL_CATEGORY}/:parentSlug/:slug`,
  },
  {
    component: ProductDetailCategoryPage,
    path: `${ROUTE_PATH.DETAIL_CATEGORY}/:parentSlug/:parentSlug/:slug`,
  },
  { component: SearchPage, path: ROUTE_PATH.SEARCH },
  {
    component: BrandDetailPage,
    path: `${ROUTE_PATH.BRAND_DETAIL}/:brandSlug`,
  },
  {
    component: RedirectPage,
    path: `${ROUTE_PATH.REDIRECT_PAGE}`,
  },
];
export default routesList;
