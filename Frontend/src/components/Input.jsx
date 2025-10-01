// src/components/Input.jsx
import React from "react";

const Input = ({ label, type = "text", value, onChange, placeholder, name }) => {
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default Input;
