import httpClient from "../../configs/axios/http-client";

const BASE_URL = "/order/cart";

export const CartAPI = {
  createCartSession: () => {
    return httpClient.post(`${BASE_URL}/createCartSession`);
  },
  getCartSession: () => {
    return httpClient.get(`${BASE_URL}/getCartSession`);
  },
  addItem: (item) => {
    return httpClient.post(`${BASE_URL}/addItem`, item);
  },
  updateQuantity: (item) => {
    return httpClient.post(`${BASE_URL}/updateQuantity`, item);
  },
  calculateTotalPrice: (items) => {
    return httpClient.post(`${BASE_URL}/calculateTotalPrice`, items);
  },
  deleteItem: (itemId) => {
    return httpClient.delete(`${BASE_URL}/deleteCartItem/${itemId}`);
  },
};
