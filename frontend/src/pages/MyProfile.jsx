import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/profile/me");
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          bio: res.data.bio || "",
          avatarUrl: res.data.avatarUrl || "",
        });
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    })();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const res = await API.put("/profile", form);
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f4f4f4]">

      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm rounded-b-3xl">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <img src="/logo.png" className="w-8" />
          Cerope
        </div>

        <div className="flex items-center gap-10 text-gray-700 text-sm font-medium">
          <a className="hover:text-black cursor-pointer">Home</a>
          <a className="hover:text-black cursor-pointer">Know My Vibe</a>
          <a className="hover:text-black cursor-pointer">My Wardrobe</a>
          <a className="hover:text-black cursor-pointer">Ask AI Pal</a>
          <a className="hover:text-black cursor-pointer">Plan Outfit</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-white border rounded-full shadow text-sm">
            Explore More ✨
          </button>
          <img
            src="/avatar1.png"
            className="w-10 h-10 rounded-full border"
            alt=""
          />
        </div>
      </nav>

      {/* Profile Page Title */}
      <h2 className="text-3xl font-semibold px-16 mt-10 mb-4">Profile</h2>

      {/* Card */}
      <div className="bg-white mx-16 p-10 rounded-2xl shadow border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Personal Details</h3>

          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-1 border rounded-lg text-sm hover:bg-gray-50"
          >
            ✏ Edit
          </button>
        </div>

        <div className="flex gap-10">

          {/* LEFT — Form */}
          <div className="flex-1 space-y-6">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  disabled={!editing}
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full p-3 border rounded-xl bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  disabled
                  value={"Shah"}
                  className="w-full p-3 border rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">Email ID</label>
                <input
                  disabled
                  value={user.email}
                  className="w-full p-3 border rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Number</label>
                <input
                  disabled
                  value={"+91 99820587654"}
                  className="w-full p-3 border rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-center gap-6">
              <label className="text-sm">Gender</label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="gender" disabled /> Male
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="gender" disabled /> Female
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="gender" disabled /> Other
              </label>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm mb-1">DOB</label>
              <div className="flex gap-4">
                <input
                  disabled
                  value="01"
                  className="w-20 p-3 border rounded-xl bg-gray-100 text-gray-400"
                />
                <input
                  disabled
                  value="10"
                  className="w-20 p-3 border rounded-xl bg-gray-100 text-gray-400"
                />
                <input
                  disabled
                  value="2000"
                  className="w-24 p-3 border rounded-xl bg-gray-100 text-gray-400"
                />
              </div>
            </div>

            {/* Save Button */}
            {editing && (
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* RIGHT — Avatar */}
          <div className="w-52 flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#f2e5d7] shadow">
              <img
                src={
                  user.avatarUrl ||
                  "https://cdn-icons-png.flaticon.com/512/1250/1250689.png"
                }
                className="w-full h-full object-cover"
              />
            </div>

            {editing && (
              <select
                value={form.avatarUrl}
                onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                className="w-full p-2 border rounded-xl bg-gray-50"
              >
                <option value="">Change Profile Picture</option>
                <option value="https://cdn-icons-png.flaticon.com/512/1250/1250689.png">
                  Avatar 1
                </option>
                <option value="https://cdn-icons-png.flaticon.com/512/4140/4140048.png">
                  Avatar 2
                </option>
                <option value="https://cdn-icons-png.flaticon.com/512/4140/4140054.png">
                  Avatar 3
                </option>
              </select>
            )}
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-10 px-5 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
