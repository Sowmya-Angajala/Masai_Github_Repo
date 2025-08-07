import React, { useReducer, useState } from 'react';

// Initial state
const initialState = {
  email: '',
  password: '',
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('invalid action type');
  }
}

export default function FormWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(state);
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
    setSubmittedData(null);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: 'email', payload: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: 'password', payload: e.target.value })
            }
            required
          />
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </form>

      <hr />

      {submittedData ? (
        <div>
          <div>User Email: {submittedData.email}</div>
          <div>User Password: {submittedData.password}</div>
        </div>
      ) : (
        <div>No details found</div>
      )}
    </div>
  );
}
