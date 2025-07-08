import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  removeCategory,
} from "../../features/categories/categorySlice";

function CategoryForm() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const customCategories = useSelector(
    (state) => state.categories.customCategories
  );
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      dispatch(addCategory(trimmed));
      setNewCategory("");
    }
  };

  const handleDelete = (category) => {
    dispatch(removeCategory(category));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Manage Categories</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add a new category"
          className="flex-grow p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {customCategories.map((cat, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded"
          >
            <span>{cat}</span>
            <button
              onClick={() => handleDelete(cat)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryForm;
