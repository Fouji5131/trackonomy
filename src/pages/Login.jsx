import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";
import { loginUser } from "../firebase/authService";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const result = await loginUser(email, password);
      dispatch(loginSuccess(result.user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Sign In
      </button>
    </form>
  );
}

export default Login;
