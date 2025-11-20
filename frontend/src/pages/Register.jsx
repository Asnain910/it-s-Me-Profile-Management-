import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email & password are required.");
      return;
    }

    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/setup");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f6f0ff] to-[#f5f5f5]">

      {/* Navbar */}
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

        {/* Form */}
        <div className="w-[380px]">
          <h2 className="text-3xl font-semibold mb-6">Set up Your Cerope Account</h2>

          {error && <div className="text-red-600 mb-3">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-xl border bg-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email Address</label>
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
                placeholder="Create a password"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full py-3 rounded-full bg-black text-white font-medium">
              Sign Up
            </button>

          </form>

          <p className="mt-6 text-sm text-center">
            Already a member?{" "}
            <Link to="/" className="text-blue-600">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Image */}
        <div className="w-[390px] h-[450px] rounded-3xl shadow overflow-hidden bg-white">
          <img src="https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" />
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
