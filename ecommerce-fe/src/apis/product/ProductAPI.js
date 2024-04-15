import httpClient from "../../configs/axios/http-client";

const BASE_URL = "/product";

export const ProductAPI = {
  getProductInfo: (id) => {
    return httpClient.get(`${BASE_URL}/getProductInfo/${id}`);
  },
  getProductInfoBySlug: (slug) => {
    return httpClient.get(`${BASE_URL}/getProductBySlug/${slug}`);
  },
  getBestSellerProduct: () => {
    return httpClient.get(`${BASE_URL}/getBestSellerProduct`);
  },
  search: (params) => {
    return httpClient.get(`${BASE_URL}/search?${params}`);
  },
  getFilterProduct: () => {
    return httpClient.get(`${BASE_URL}/getFilterProduct`);
  },
  getProductByClassificationDetail: (params) => {
    return httpClient.get(`${BASE_URL}/getProductsBySpecification?${params}`);
  },
};
