import React, { useState } from "react";
import axios from "axios";

const Loginpage = () => {
  const [form, setForm] = useState({
    Username: "",
    password: "",
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (form.Username === "" || form.password === "") {
        console.log("all fields are required");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_API_BASE_URL}/login`,
        form,
        { withCredentials: true }
      );

      console.log(res.data);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={loginUser}>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.Username}
              placeholder="Enter username"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter password"
              onChange={handlechange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm mb-2">Continue with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 border rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
