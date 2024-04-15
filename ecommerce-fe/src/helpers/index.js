import { LOCAL_STORE } from "../const/system.const";

import _ from "lodash";

export const localStorageHelper = {
  setItem: (key, value) => {
    let valueStringify = value;
    if (typeof value === "object") {
      valueStringify = JSON.stringify(value);
    }
    localStorage.setItem(key, valueStringify);
  },
  getItem: (key, isObject) => {
    const value = localStorage.getItem(key);
    if (value && isObject) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  // TODO: check token expired
  isLogin: () => {
    return !!localStorageHelper.getItem(LOCAL_STORE.TOKEN);
  },
};
export const isEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

// TODO: @P: rename function
export const formatReq = (valuesReq) => {
  const newValues = _.cloneDeep(valuesReq);
  for (const key in newValues) {
    if (newValues[key] === "all") {
      delete newValues[key];
    }
  }
  return newValues;
};

export const MegaByteToByte = (value) => value * 1024 * 1024;
export const ByteToMegaByte = (value) => value / 1024 / 1024;
export const isCurrentPath = (path, pathname) => {
  const reg = new RegExp(`${path}(/[a-zA-Z0-9]+)?`);
  return path && reg.test(pathname);
};

export const formatCurrency = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
