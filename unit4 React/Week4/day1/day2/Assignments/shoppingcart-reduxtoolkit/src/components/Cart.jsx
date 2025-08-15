import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';

const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map(item => (
          <div key={item.id} style={{ marginBottom: '8px' }}>
            {item.name} - ₹{item.price}
            <button
              style={{ marginLeft: '8px' }}
              onClick={() => dispatch(removeItem(item.id))}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
