"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementCartItem, decrementCartItem } from '../store/actions/carttActions';
import { RootState } from '../store/reducers';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api'; 
import cartStyle from './cart.module.scss';
import { addToWishlist } from '../store/actions/wishlistActions';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishListProducts = useSelector((state: RootState) => state.whistlist.wishListProducts); 
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementCartItem(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementCartItem(id));
  };
  const handleAddToWishlist = (product: any) => {

    const isAlreadyInWishlist = wishListProducts.some(
      (wishlistItem) => wishlistItem.id === product.id
    );

    if (!isAlreadyInWishlist) {
      dispatch(addToWishlist(product));
    } else {
      alert('This product is already in your wishlist!');
    }
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className={cartStyle.cartWrapper}>
      <h1 className={cartStyle.cartTitle}>Shopping Cart</h1>
      {cartItems.length === 0 ? ( <p className={cartStyle.emptyCartMessage}>Your cart is empty. Start shopping!</p> ) : (
        <div className={cartStyle.cartContent}>
          {cartItems.map((item) => (
            <div key={item.product.id} className={cartStyle.cartItem}>
              <div className={cartStyle.cartItemLeft}>
                <img src={item.product.image} alt={item.product.name} className={cartStyle.productImage} />
              </div>
              <div className={cartStyle.cartItemCenter}>
                <h4 className={cartStyle.productName}>{item.product.name}</h4>
                <p className={cartStyle.productPrice}>Price: ${item.product.price}</p>
                <div className={cartStyle.quantityActions}>               
                  <Button icon={PrimeIcons.MINUS} onClick={() => handleDecrement(item.product.id)} />
                  <span className={cartStyle.productQuantity}>{item.quantity}</span>
                  <Button icon={PrimeIcons.PLUS} onClick={() => handleIncrement(item.product.id)} />
                </div>
              </div>
              <div className={cartStyle.cartItemRight}>
                <Button icon={PrimeIcons.TRASH} onClick={() => handleRemove(item.product.id)} aria-label="Remove Item"/>
                <Button icon={PrimeIcons.HEART} onClick={() => handleAddToWishlist(item.product)}  aria-label="Add to Wishlist" />
              </div>
            </div>
          ))}
          <h2 className={cartStyle.totalPrice}>Total Price: ${totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
