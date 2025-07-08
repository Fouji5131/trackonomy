import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: ["Food", "Transport", "Bills", "Entertainment"],
  customCategories: [], // For user-defined categories
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = action.payload;
      if (!state.list.includes(newCategory)) {
        state.customCategories.push(newCategory);
        state.list.push(newCategory);
      }
    },
    removeCategory: (state, action) => {
      const categoryToRemove = action.payload;
      state.customCategories = state.customCategories.filter(
        (cat) => cat !== categoryToRemove
      );
      state.list = state.list.filter((cat) => cat !== categoryToRemove);
    },
    resetCategories: () => initialState,
  },
});

export const { addCategory, removeCategory, resetCategories } =
  categorySlice.actions;
export default categorySlice.reducer;
