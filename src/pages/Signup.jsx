import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";
import { signUpUser } from "../firebase/authService";

function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const result = await signUpUser(email, password);
      dispatch(loginSuccess(result.user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Sign Up</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        Create Account
      </button>
    </form>
  );
}

export default Signup;
