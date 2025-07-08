import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../features/expenses/expenseThunks";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import CategoryForm from "../components/categories/CategoryForm";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchExpenses(user.uid));
    }
  }, [dispatch, user?.uid]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300">
        Trackonomy Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <ExpenseForm />
        <CategoryForm />
      </div>

      <ExpenseList />
    </div>
  );
}

export default Dashboard;
