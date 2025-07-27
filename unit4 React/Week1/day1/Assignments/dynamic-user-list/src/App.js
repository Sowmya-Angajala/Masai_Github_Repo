import React from "react";
import UserList from "./UserList";
// import "./styles.css";
import './Styles.css'

const initialUsers = [
  { name: "Alice", email: "alice@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 30 }
];

function App() {
  return (
    <div className="App">
      <UserList users={initialUsers} />
    </div>
  );
}

export default App;
