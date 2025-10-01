import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
import Input from "../components/Input";
import Button from "../components/Button";
import GoogleButton from "../components/GoogleButton";
import { registerUser } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    fatherNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSignInResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          const idToken = await user.getIdToken();
          localStorage.setItem("token", idToken);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during Google Sign-In redirect result:", error);
      }
    };
    checkSignInResult();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, phone, age, fatherNumber, password, confirmPassword } = formData;

    if (!name || !email || !phone || !age || !fatherNumber || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name, email, phone, age: Number(age), fatherNumber, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            label="Phone Number"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <Input
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />

          <Input
            label="Father's Number"
            type="text"
            name="fatherNumber"
            value={formData.fatherNumber}
            onChange={handleChange}
            placeholder="Enter your father's number"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
          />

          <div className="text-center">
            <Button type="submit" loading={loading}>Register</Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Or sign up with Google</p>
          <GoogleButton />
        </div>

        <div className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
