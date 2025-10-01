// src/components/TableRow.jsx
import React, { useState } from "react";
import { deleteUser, updateUser } from "../services/api";
import Button from "./Button";
import Input from "./Input";

const TableRow = ({ user, selected, onSelect, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    await deleteUser(user._id);
    refresh();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateUser(user._id, formData);
    setIsEditing(false);
    setSuccessMessage("Successfully updated");
    setTimeout(() => setSuccessMessage(""), 3000);
    refresh();
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
      <td className="p-4 text-center">
        <input type="checkbox" checked={selected} onChange={onSelect} />
      </td>
      <td className="p-4">
        {isEditing ? (
          <Input
            value={formData.name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
          />
        ) : (
          user.name
        )}
      </td>
      <td className="p-4">
        {isEditing ? (
          <Input
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
          />
        ) : (
          user.email
        )}
      </td>
      <td className="p-4">
        {isEditing ? (
          <Input
            value={formData.phone}
            onChange={handleChange}
            name="phone"
            placeholder="Phone"
          />
        ) : (
          user.phone
        )}
      </td>
      <td className="p-4">
        {isEditing ? (
          <Input
            value={formData.age}
            onChange={handleChange}
            name="age"
            placeholder="Age"
          />
        ) : (
          user.age
        )}
      </td>
      <td className="p-4">
        {isEditing ? (
          <Input
            value={formData.fatherNumber}
            onChange={handleChange}
            name="fatherNumber"
            placeholder="Father's Number"
          />
        ) : (
          user.fatherNumber
        )}
      </td>
      <td className="p-4 space-x-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md font-medium mr-2">
              Save
            </Button>
            <Button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md font-medium">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md font-medium mr-2">
              Edit
            </Button>
            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium">
              Delete
            </Button>
          </>
        )}
      </td>
    </tr>
    {successMessage && (
      <tr>
        <td colSpan="7" className="p-4 text-center bg-green-100 text-green-700">
          {successMessage}
        </td>
      </tr>
    )}
    </>
  );
};

export default TableRow;
