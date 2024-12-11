"use client"

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions/carttActions';
import { RootState } from '../store/reducers';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart">
      {cartItems.map(item => (
        <div key={item.product.id} className="cart-item">
          <h4>{item.product.title}</h4>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleRemove(item.product.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
