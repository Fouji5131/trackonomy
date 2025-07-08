import { createSlice } from "@reduxjs/toolkit";
import { fetchExpenses, createExpense, removeExpense } from "./expenseThunks";

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.total = action.payload.reduce((sum, exp) => sum + exp.amount, 0);
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.total += action.payload.amount;
      })

      .addCase(removeExpense.fulfilled, (state, action) => {
        const id = action.payload;
        const item = state.items.find((e) => e.id === id);
        state.total -= item?.amount || 0;
        state.items = state.items.filter((e) => e.id !== id);
      });
  },
});

export default expenseSlice.reducer;
