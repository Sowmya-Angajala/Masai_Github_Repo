import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import "../App.css";
import "../index.css"
const products = [
  { id: 1, name: '🥦 Broccoli', price: 40 },
  { id: 2, name: '🥕 Carrot', price: 25 },
  { id: 3, name: '🌽 Corn', price: 30 },
  { id: 4, name: '🍉 Watermelon', price: 20 },
  { id: 5, name: '🥑 Avocado', price: 35 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} style={{ marginBottom: '8px' }}>
          {product.name} - ₹{product.price}
          <button
            style={{ marginLeft: '8px' }}
            onClick={() => dispatch(addItem(product))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
