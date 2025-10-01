// src/services/api.js
import axios from "axios";

const API_BASE_URL = "/api";

export const loginUser = async ({ email, password }) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

export const registerUser = async (formData) => {
  const { confirmPassword, ...userData } = formData;
  return axios.post(`${API_BASE_URL}/auth/register`, userData);
};


// src/services/api.js

const getInitialUsers = () => [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", age: 25, fatherNumber: "9876543210" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "2345678901", age: 30, fatherNumber: "8765432109" },
];

let users = JSON.parse(localStorage.getItem("users")) || getInitialUsers();

// Save to localStorage
const saveUsers = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Fetch all users
export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/users`);
  return response.data;
};

// Update user
export const updateUser = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/auth/users/${id}`, data);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/auth/users/${id}`);
  return response.data;
};

// Delete multiple users
export const deleteMultipleUsers = async (ids) => {
  const response = await axios.delete(`${API_BASE_URL}/auth/users`, { data: { ids } });
  return response.data;
};
