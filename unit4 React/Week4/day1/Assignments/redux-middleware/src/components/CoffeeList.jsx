
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoffee } from "../redux/actions";
import '../App.css';


export const CoffeeList = ({ sortBy }) => {
  const dispatch = useDispatch();
  const { loading, coffees, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCoffee(sortBy));
  }, [sortBy]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
     <div className="coffee-grid">
      {coffees.map((coffee) => (
        <div key={coffee.id} className="coffee-card">
          <img src={coffee.image} alt={coffee.title} />
          <h3>{coffee.title}</h3>
          <p>Price: ₹{coffee.price}</p>
        </div>
      ))}
    </div>
  );
};
