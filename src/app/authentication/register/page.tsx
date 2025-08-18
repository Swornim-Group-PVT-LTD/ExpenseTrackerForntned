"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phonenumber: "",
    password: "",
    country: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", formData);
      setMessage(res.data.message);
    } catch (error: any) {
      setMessage(`${error.response?.data?.error || "Registration failed"}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-50 dark:bg-gray-900 px-5  sm-px-0 pt-10 sm:pt-0">
      <div className="bg-[var(--color1)] shadow-xl rounded-xl p-8 w-full max-w-xl text-white">
        <h2 className=" text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium ">First Name</label>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Middle Name
              </label>
              <input
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Last Name
              </label>
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Phone Number
              </label>
              <input
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Country
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color2)] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Register
          </button>

          <div className="font-bold text-center">
            Already have an account?
            <Link href="/authentication/login">Login</Link>
          </div>
        </form>

        {message && (
          <p className="bg-red-500 mt-4 text-center text-md text-white p-2 rounded-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
