import React from "react";

function Navbar({ onNavigate }) {
  return (
    <nav style={styles.navbar}>
      <button onClick={() => onNavigate("home")} style={styles.button}>Home</button>
      <button onClick={() => onNavigate("about")} style={styles.button}>About</button>
      <button onClick={() => onNavigate("contact")} style={styles.button}>Contact</button>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    backgroundColor: "#f0f0f0",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  }
};

export default Navbar;
