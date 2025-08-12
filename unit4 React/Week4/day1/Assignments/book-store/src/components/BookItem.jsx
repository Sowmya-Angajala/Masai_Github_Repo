import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleReadStatus, editBook, deleteBook } from "../redux/booksSlice";

export default function BookItem({ book }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: book.title, author: book.author, genre: book.genre });

  const saveEdit = () => {
    dispatch(editBook({ id: book.id, updatedData: editData }));
    setIsEditing(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      {isEditing ? (
        <>
          <input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
          <input value={editData.author} onChange={(e) => setEditData({ ...editData, author: e.target.value })} />
          <input value={editData.genre} onChange={(e) => setEditData({ ...editData, genre: e.target.value })} />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <h3>{book.title}</h3>
          <p>{book.author} - {book.genre}</p>
          <p>Status: {book.isRead ? "Read" : "Unread"}</p>
          <button onClick={() => dispatch(toggleReadStatus(book.id))}>
            Mark as {book.isRead ? "Unread" : "Read"}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
        </>
      )}
    </div>
  );
}
