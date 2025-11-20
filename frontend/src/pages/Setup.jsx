import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    avatarUrl: "",
    dob: "",
    stylePreference: "",
    phone: "",
    country: "",
    city: "",
  });

  const [avatarMenu, setAvatarMenu] = useState(false);
  const navigate = useNavigate();

  const avatarOptions = [
    "/avatars/a1.png",
    "/avatars/a2.png",
    "/avatars/a3.png",
    "/avatars/a4.png",
    "/avatars/a5.png",
    "/avatars/a6.png",
    "/avatars/a7.png",
    "/avatars/a8.png",
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/profile/me");
        setProfile((p) => ({
          ...p,
          firstName: res.data.name?.split(" ")[0] || "",
          lastName: res.data.name?.split(" ")[1] || "",
          avatarUrl: res.data.avatarUrl || "",
        }));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("/profile", {
        name: profile.firstName + " " + profile.lastName,
        avatarUrl: profile.avatarUrl,
      });
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] to-[#f5f5f5]">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow rounded-b-3xl">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <img src="/logo.png" className="w-8" />
          Cerope
        </div>
        <button className="px-4 py-2 bg-white border rounded-full shadow text-sm">
          Explore More ✨
        </button>
      </nav>

      {/* MAIN SECTION */}
      <div className="flex justify-center gap-20 px-10 py-14">
        {/* LEFT FORM */}
        <form
          onSubmit={handleSubmit}
          className="w-[420px] bg-white p-10 rounded-2xl shadow border"
        >
          <h2 className="text-3xl font-semibold mb-8">
            Set up your User account
          </h2>

          {/* First / Last name */}
          <div className="grid grid-cols-2 gap-6 mb-5">
            <div>
              <label className="text-sm mb-1 block">First Name *</label>
              <input
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                className="w-full p-3 border rounded-xl bg-gray-50"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Last Name *</label>
              <input
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                className="w-full p-3 border rounded-xl bg-gray-50"
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="mb-5 relative">
            <label className="text-sm mb-1 block">Profile Picture</label>

            <div className="flex items-center gap-3">
              <img
                src={
                  profile.avatarUrl ||
                  "https://cdn-icons-png.flaticon.com/512/1250/1250689.png"
                }
                className="w-12 h-12 rounded-full border object-cover"
              />

              <button
                type="button"
                onClick={() => setAvatarMenu(!avatarMenu)}
                className="w-full p-3 border rounded-xl bg-gray-50 text-left text-sm"
              >
                Select Profile Picture ▾
              </button>
            </div>

            {/* Avatar Dropdown */}
            {avatarMenu && (
              <div className="absolute z-20 mt-2 bg-white border rounded-xl shadow p-4 grid grid-cols-4 gap-3">
                {avatarOptions.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    onClick={() =>
                      setProfile({ ...profile, avatarUrl: a }) ||
                      setAvatarMenu(false)
                    }
                    className="w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* DOB */}
          <div className="mb-5">
            <label className="text-sm mb-1 block">Date of Birth *</label>
            <input
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              className="w-full p-3 border rounded-xl bg-gray-50"
            />
          </div>

          {/* Style Preference */}
          <div className="mb-5">
            <label className="text-sm mb-1 block">Style Preference *</label>
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="style"
                  onClick={() =>
                    setProfile({ ...profile, stylePreference: "Man" })
                  }
                />
                Man
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="style"
                  onClick={() =>
                    setProfile({ ...profile, stylePreference: "Woman" })
                  }
                />
                Woman
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="style"
                  onClick={() =>
                    setProfile({ ...profile, stylePreference: "Both" })
                  }
                />
                Both
              </label>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label className="text-sm mb-1 block">Phone Number *</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full p-3 border rounded-xl bg-gray-50"
              placeholder="Enter phone number"
            />
          </div>

          {/* Country + City */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
              <label className="text-sm mb-1 block">Country *</label>
              <input
                value={profile.country}
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
                className="w-full p-3 border rounded-xl bg-gray-50"
                placeholder="Enter country"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">City *</label>
              <input
                value={profile.city}
                onChange={(e) =>
                  setProfile({ ...profile, city: e.target.value })
                }
                className="w-full p-3 border rounded-xl bg-gray-50"
                placeholder="Enter location"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => navigate("/profile")}
            className="w-full py-3 bg-black text-white rounded-full text-lg hover:bg-gray-900"
          >
            Continue
          </button>
        </form>

        {/* RIGHT IMAGE */}
        <div className="w-[360px] h-[480px] rounded-3xl shadow overflow-hidden bg-white">
          <img
            src="https://plus.unsplash.com/premium_photo-1668485968660-67a0f563d59a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-full object-cover"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
}
