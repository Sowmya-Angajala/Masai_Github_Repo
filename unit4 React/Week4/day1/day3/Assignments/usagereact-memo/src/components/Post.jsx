import React, { useMemo } from "react";

function Post({ post, toggleVerify, optimized }) {
  const { id, title, body, verifyPost } = post;

  const backgroundColor = useMemo(() => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 85%)`;
  }, optimized ? [] : [id]);

  console.log(
    `Rendering Post ID: ${id} ${optimized ? "(Optimized)" : "(Not Optimized)"}`
  );

  return (
    <div
      style={{
        backgroundColor,
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
      <h4>{title}</h4>
      <p>{body}</p>
      <p>
        Status:{" "}
        <strong style={{ color: verifyPost ? "green" : "red" }}>
          {verifyPost ? "Verified" : "Not Verified"}
        </strong>
      </p>
      <button onClick={() => toggleVerify(id)}>
        {verifyPost ? "Unverify" : "Verify"}
      </button>
    </div>
  );
}

export default React.memo(Post);
