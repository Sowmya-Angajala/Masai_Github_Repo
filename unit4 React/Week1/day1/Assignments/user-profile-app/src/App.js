import React from "react";

function UserProfile(props) {
  return (
    <div>
      <h2>User Profile</h2>
      {props.user && (
        <div>
          <p>Name: {props.user.name}</p>
          <p>Email: {props.user.email}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const user = {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com"
  };

  return (
    <div>
      <h1>Welcome</h1>
      <UserProfile user={user} />
    </div>
  );
}

export default App;

// Passed user prop to UserProfile: <UserProfile user={user} />
// Correctly used props.user.name and props.user.email instead of just user.name.