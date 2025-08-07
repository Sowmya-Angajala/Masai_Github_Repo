import React, { useState, useEffect, useRef } from "react";

function FetchData() {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const localPage = useRef(0); 

  const itemsPerPage = 10;

  useEffect(() => {
    async function Fetch() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const result = await response.json();
      setPost(result.results);
      localPage.current = 0;
    }
    Fetch();
  }, [page]);

  const paginatedData = post.slice(
    localPage.current * itemsPerPage,
    (localPage.current + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (localPage.current === 0) {
      localPage.current = 1;
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (localPage.current === 1) {
      localPage.current = 0;
    } else if (page > 1) {
      setPage((prev) => prev - 1);
      localPage.current = 1;
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Rick and Morty Characters</h1>
      <h2 style={{ textAlign: "center" }}>
        API Page: {page} | Local Page:{" "}
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "5px",
            backgroundColor: "#b2f2bb", // highlight color
            color: "#000",
          }}
        >
          {localPage.current + 1}
        </span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {paginatedData.map((character) => (
          <div
            key={character.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              {character.name}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={handlePrev}
          disabled={page === 1 && localPage.current === 0}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#ddd",
            border: "none",
          }}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#ddd",
            border: "none",
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default FetchData;
