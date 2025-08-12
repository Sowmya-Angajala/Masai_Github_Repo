import React from "react";
import BookForm from "./components/BookForm";
import Filter from "./components/Filter";
import BookList from "./components/BookList";

export default function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Book Store</h1>
      <BookForm />
      <Filter />
      <BookList />
    </div>
  );
}
