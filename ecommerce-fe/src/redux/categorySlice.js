import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { CategoryAPI } from "../apis/category/CategoryAPI";

export const getAllCategory = createAsyncThunk("category/getAll", async () => {
  try {
    // const rs = await CategoryAPI.getAll();
    // const data = rs?.data;
    // return data;
  } catch {
    console.log("có lỗi xảy ra");
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCategory = (state) => state.category;

export const selectCategoryItems = createSelector(
  selectCategory,
  (category) => category.items
);

export default categorySlice.reducer;
