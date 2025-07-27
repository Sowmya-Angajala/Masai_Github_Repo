import React, { useState } from "react";
import UserCard from "./UserCard";

const UserList = ({ users }) => {
  const [userList, setUserList] = useState(users);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.age || isNaN(formData.age) || parseInt(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number.";
    }
    return newErrors;
  };

  const handleAddUser = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age)
    };

    setUserList((prev) => [...prev, newUser]);
    setFormData({ name: "", email: "", age: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>User List</h2>
      <div className="form">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
        />
        {errors.age && <span className="error">{errors.age}</span>}

        <button onClick={handleAddUser}>Add User</button>
      </div>

      <div className="user-list">
        {userList.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
