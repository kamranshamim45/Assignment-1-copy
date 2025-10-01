// src/components/Table.jsx
import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import { getUsers, deleteMultipleUsers } from "../services/api";
import Button from "./Button";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sorted);
    setSortField(field);
    setSortOrder(order);
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) setSelected(selected.filter((i) => i !== id));
    else setSelected([...selected, id]);
  };

  const handleSelectAll = () => {
    if (selected.length === users.length) setSelected([]);
    else setSelected(users.map((u) => u._id));
  };

  const handleDeleteSelected = async () => {
    await deleteMultipleUsers(selected);
    setSelected([]);
    fetchUsers();
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {selected.length > 0 && (
        <Button onClick={handleDeleteSelected} className="bg-red-500 hover:bg-red-600">
          Delete Selected ({selected.length})
        </Button>
      )}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 border-b">
              <input type="checkbox" checked={selected.length === users.length} onChange={handleSelectAll} />
            </th>
            {["name","email","phone","age","fatherNumber"].map((col) => (
              <th
                key={col}
                className="cursor-pointer p-4 border-b text-left font-semibold text-gray-700"
                onClick={() => handleSort(col)}
              >
                {col === "fatherNumber" ? "FATHER'S NUMBER" : col.toUpperCase()}
              </th>
            ))}
            <th className="p-4 border-b text-left font-semibold text-gray-700">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <TableRow
              key={user._id}
              user={user}
              selected={selected.includes(user._id)}
              onSelect={() => handleSelect(user._id)}
              refresh={fetchUsers}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
