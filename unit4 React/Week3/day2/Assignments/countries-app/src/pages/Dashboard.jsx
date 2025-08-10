import React, { useReducer, useState } from "react";
import CountrySearch from "../components/CountrySearch.jsx";
import { collegeFormReducer, initialCollegeForm } from "./reducers/collegeFormReducer.jsx";


export default function Dashboard() {
  const [state, dispatch] = useReducer(collegeFormReducer, initialCollegeForm);
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!state.name) e.name = "Name required";
    if (!state.age || isNaN(Number(state.age))) e.age = "Valid age required";
    if (!state.course) e.course = "Course required";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length === 0) {
      setSubmitted(state);
      dispatch({ type: "RESET" });
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <section className="panel">
        <h3>College Form (useReducer)</h3>
        <form onSubmit={handleSubmit} className="form-inline">
          <label>
            Name
            <input value={state.name} onChange={(e)=>dispatch({type:"UPDATE_FIELD", field:"name", value:e.target.value})} />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>
          <label>
            Age
            <input value={state.age} onChange={(e)=>dispatch({type:"UPDATE_FIELD", field:"age", value:e.target.value})} />
            {errors.age && <small className="error">{errors.age}</small>}
          </label>
          <label>
            Gender
            <select value={state.gender} onChange={(e)=>dispatch({type:"UPDATE_FIELD", field:"gender", value:e.target.value})}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Course
            <input value={state.course} onChange={(e)=>dispatch({type:"UPDATE_FIELD", field:"course", value:e.target.value})} />
            {errors.course && <small className="error">{errors.course}</small>}
          </label>
          <label>
            Year
            <input value={state.year} onChange={(e)=>dispatch({type:"UPDATE_FIELD", field:"year", value:e.target.value})} />
          </label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
          </div>
        </form>
        {submitted && (
          <div className="card small">
            <h4>Submitted</h4>
            <pre>{JSON.stringify(submitted, null, 2)}</pre>
          </div>
        )}
      </section>

      <section className="panel">
        <h3>Country Search</h3>
        <CountrySearch />
      </section>
    </div>
  );
}
