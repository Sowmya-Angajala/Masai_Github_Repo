import React from "react";
import { useSelector } from "react-redux";
import BookItem from "./BookItem";

export default function BookList() {
  const { books, filter } = useSelector(state => state);

  const filteredBooks = books.filter(book => {
    const matchesAuthor = filter.author ? book.author.toLowerCase().includes(filter.author.toLowerCase()) : true;
    const matchesGenre = filter.genre ? book.genre.toLowerCase().includes(filter.genre.toLowerCase()) : true;
    const matchesStatus = filter.status === "all" ? true : filter.status === "read" ? book.isRead : !book.isRead;
    return matchesAuthor && matchesGenre && matchesStatus;
  });

  return (
    <div>
      {filteredBooks.length > 0 ? (
        filteredBooks.map(book => <BookItem key={book.id} book={book} />)
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
}
