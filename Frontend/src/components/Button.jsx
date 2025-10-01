// src/components/Button.jsx
import React from "react";

const Button = ({ children, onClick, type = "button", loading = false, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition duration-300 ${className}`}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};

export default Button;
