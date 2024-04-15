export const RESPONSE_STATUS = {
  SUCESS: 200,
  NOT_FOUND: 404,
  INTERVAL_SERVER: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
export const DEFAULT_PAGESIZE = 25;
export const LOCAL_STORE = {
  TOKEN: "ECOMMERCE_TOKEN",
  CART_SESSION: "CART_SESSION",
  LANGUAGE: "LANGUAGE",
};

export const ROUTE_PATH = {
  HOME: "/",
  ABOUT: "/about",
  SEARCH: "/search",
  PRODUCT: "/product",
  CATEGORY: "/category/:slug",
  DETAIL_CATEGORY: "/category",
  CART: "/cart",
  BRAND_DETAIL: "/brand",
  REDIRECT_PAGE: "/redirect",
};

export const ROLES = {
  Admin: "ADMIN",
  Client: "CLIENT",
};

export const LANGUAGE = {
  VI: "vi",
  EN: "en",
};

export const PAGESIZE_OPTIONS = [10, 25, 50, 100];
export const DEFAULT_PAGE_PARAMS = { pageNo: 1, pageSize: 9, status: true };
export const FORMAT = ["PDF", "jpeg", "png", "jpg"];

export const NO_CORRESPONDING_DATA = "Không tồn tại dữ liệu tương ứng";
export const NO_DATA = "Không có dữ liệu";
export const NO_EMPTY_DATA = "Không được để trống";

export const IMAGE_ACCEPT = ["image/jpg", "image/jpeg", "image/png"];
export const VIDEO_ACCEPT = ["video/mp4", "video/x-m4v", "video/*"];
// export const VIDEO_ACCEPT = 'video/mp4,video/x-m4v,video/*';
export const NOTE_MAX_LENGTH = 1000;
