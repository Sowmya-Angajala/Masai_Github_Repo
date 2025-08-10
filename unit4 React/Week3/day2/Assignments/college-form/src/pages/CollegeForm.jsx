import React, { useReducer, useState } from "react";

const initialState = {
  name: "",
  age: "",
  gender: "",
  course: "",
  year: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function CollegeForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!state.name || !state.age || !state.gender || !state.course || !state.year) {
      alert("Please fill all fields");
      return;
    }
    setSubmittedData(state);
    dispatch({ type: "RESET" });
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={state.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={state.age}
          onChange={handleChange}
        />

        <select name="gender" value={state.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="course"
          placeholder="Course Name"
          value={state.course}
          onChange={handleChange}
        />

        <input
          type="number"
          name="year"
          placeholder="Year of Study"
          value={state.year}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h4>Submitted Data:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
