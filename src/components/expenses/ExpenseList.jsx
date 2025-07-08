import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeExpense } from "../features/expenses/expenseThunks";
import { motion, AnimatePresence } from "framer-motion";

function ExpenseList() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);

  const handleDelete = (id) => {
    dispatch(removeExpense(id));
  };

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Your Expenses</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses yet. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {expenses.map((exp) => (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded shadow"
              >
                <div>
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ₹{exp.amount.toFixed(2)} • {exp.category} • {exp.date}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
