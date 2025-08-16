import React from "react";
import useForm from "../hooks/useForm";

function LoginForm() {
  const { values, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
