import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const products = [
  { id: 1, name: 'Lotion', price: 100 },
  { id: 2, name: 'Shampoo', price: 150 },
  { id: 3, name: 'Hair Mask', price: 250 },
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
