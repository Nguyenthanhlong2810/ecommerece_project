import * as Yup from "yup";

export const STORAGE_TYPE = {
  SERVER: "SERVER",
  CLOUD: "CLOUD",
};
export const TYPE_FILTER = {
  SELECT_BOX: "SELECT_BOX",
  MULTIPLE_CHOICES: "MULTIPLE_CHOICES",
};

export const SORT_BY = [
  {
    name: "Bán chạy",
    key: "SELLING",
  },
  {
    name: "Giá cao",
    key: "HIGH_PRICE",
  },
  {
    name: "Giá thấp",
    key: "LOW_PRICE",
  },
];

export const COMMON_MESSAGE = {
  required: "Thông tin bắt buộc",
  invalidEmail: "Email không hợp lệ",
  unknownError: "Có lỗi xảy ra",
};

export const COMMON_VALIDATION = {
  phoneValidation: Yup.string()
    .required("Thông tin bắt buộc")
    .min(10, "Số điện thoại phải ít nhất 10 ký tự")
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  requireField: Yup.string().required(COMMON_MESSAGE.required),
};
