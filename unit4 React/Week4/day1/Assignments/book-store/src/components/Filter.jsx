import React from "react";
import { useDispatch } from "react-redux";
import { setAuthor, setGenre, setStatus } from "../redux/filterSlice";

export default function Filter() {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: "20px" }}>
      <input placeholder="Filter by Author" onChange={(e) => dispatch(setAuthor(e.target.value))} />
      <input placeholder="Filter by Genre" onChange={(e) => dispatch(setGenre(e.target.value))} />
      <select onChange={(e) => dispatch(setStatus(e.target.value))}>
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </div>
  );
}
