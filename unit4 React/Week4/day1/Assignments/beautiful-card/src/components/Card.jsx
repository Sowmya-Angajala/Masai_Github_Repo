import React from "react";
import "./Card.css";

const Card = ({ title, image, description }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <img src={image} alt={title} className="card-image" />
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
