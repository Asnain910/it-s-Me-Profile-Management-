import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f6f0ff] to-[#f5f5f5]">

      {/* Top Nav */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <img src="/logo.png" className="w-8" />
          Cerope
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-full bg-white border shadow text-sm hover:bg-gray-100">
            Explore More ✨
          </button>
          <img src="/avatar1.png" className="w-10 h-10 rounded-full border" />
        </div>
      </nav>

      {/* Main */}
      <div className="flex-1 flex justify-center items-start gap-20 px-10 py-16">

        {/* Left: Login Form */}
        <div className="w-[380px]">
          <h2 className="text-3xl font-semibold mb-2">Welcome Back to Cerope</h2>
          <p className="text-gray-500 mb-8">Your personalized fashion journey awaits.</p>

          {error && <div className="text-red-600 mb-3">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl border bg-white"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl border bg-white"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="text-blue-600">Forgot Password?</button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-black text-white font-medium"
            >
              Sign In
            </button>

            <div className="flex items-center">
              <span className="flex-1 h-px bg-gray-300"></span>
              <span className="px-2 text-gray-500 text-sm">or</span>
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>

            {/* Google */}
            <button className="w-full py-3 rounded-xl border bg-white flex items-center justify-center gap-2">
              <img src="/google.png" className="w-5" />
              Continue with Google
            </button>
          </form>

          <p className="text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Image */}
        <div className="w-[390px] h-[450px] rounded-3xl shadow overflow-hidden bg-white">
          <img src="https://plus.unsplash.com/premium_photo-1668485966810-cbd0f685f58f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white px-20 py-14">
      <div className="flex justify-between text-sm">

        <div className="max-w-xs">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <img src="/logo.png" className="w-8" />
            Cerope
          </div>
          <p className="mt-3 text-gray-300">
            Revolutionizing fashion with AI-powered styling solutions.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Contact Us</li>
            <li>About</li>
            <li>Features</li>
            <li>FAQ’s</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3">Products</h4>
          <ul className="space-y-2 text-gray-400">
            <li>User Styling</li>
            <li>Launching Soon</li>
            <li>Price Comparison</li>
            <li>Creator Space</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3">Policies</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Privacy Policy</li>
            <li>Copyright Policy</li>
            <li>Cookie Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        ©2025 Cerope. All rights reserved.
      </div>
    </footer>
  );
}
