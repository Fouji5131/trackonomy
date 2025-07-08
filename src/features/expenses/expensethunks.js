import { db } from "./config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const addExpenseToDB = async (expense, userId) => {
  const expenseRef = collection(db, "expenses");
  return await addDoc(expenseRef, {
    ...expense,
    userId,
  });
};

export const getExpensesForUser = async (userId) => {
  const expenseRef = collection(db, "expenses");
  const q = query(expenseRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteExpenseFromDB = async (id) => {
  const expenseDoc = doc(db, "expenses", id);
  return await deleteDoc(expenseDoc);
};
