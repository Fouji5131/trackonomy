import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenses/expenseSlice";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
    categories: categoryReducer,
  },
});
