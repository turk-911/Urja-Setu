import React, { useState, useEffect } from "react";
import {
  createUser,
  fetchUsers,
  updateUser,
  deleteUser,
} from "../utils/mutation";

interface User {
  id?: string;
  name: string;
  email: string;
  age: number;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    age: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id as string, formData);
      setEditingUser(null);
    } else {
      await createUser(formData);
    }
    setFormData({ name: "", email: "", age: 0 });
    loadUsers();
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setEditingUser(user);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <h1>Firebase CRUD Example</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="m-4">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="m-4">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="m-4">{editingUser ? "Update" : "Add"} User</button>
        {editingUser && (
          <button
            type="button"
            className="m-4"
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: "", email: "", age: 0 });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>User List</h2>
      {users.map((user) => (
        <div className="m-4" key={user.id}>
          <p>
            <strong>Name:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Age:</strong> {user.age}
          </p>
          <button className="m-4" onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id as string)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserForm;
