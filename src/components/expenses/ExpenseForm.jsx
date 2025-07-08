import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense } from "../features/expenses/expenseThunks";
import { v4 as uuidv4 } from "uuid";

function ExpenseForm() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const user = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date || !user?.uid) return;

    const expense = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    dispatch(createExpense({ expense, userId: user.uid }));

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow-md max-w-md mx-auto space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Expense</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      >
        <option value="">Select Category</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Save Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
