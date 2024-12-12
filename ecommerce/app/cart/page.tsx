// "use client"

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart } from '../store/actions/carttActions';
// import { RootState } from '../store/reducers';
// import { Button } from 'primereact/button';
// import cartStyle from './cart.module.scss';


// const Cart = () => {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   const handleRemove = (id: number) => {
//     dispatch(removeFromCart(id));
//   };

//   return (
//     <div className={cartStyle.cartWrapper}>
//       <h1>Cart Page</h1>
//       {cartItems.map(item => (
//         <div key={item.product.id} className="cart-item">
//           <h4>{item.product.title}</h4>
//           <p>Quantity: {item.quantity}</p>
//           <Button label="Remove" onClick={() => handleRemove(item.product.id)} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Cart;

"use client"

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions/carttActions';
import { RootState } from '../store/reducers';
import { Button } from 'primereact/button';
import cartStyle from './cart.module.scss';

interface cartItems {
  id: number;
  name: string
  description: string;
  price: number;
  image: string;
  quantity: number;
}
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={cartStyle.cartWrapper}>
      <h1>Cart Page</h1>
      {cartItems.map(item => (
        <div key={item.product.id} className="cart-item">
          <h4>{item.product.title}</h4>
          <p>Quantity: {item.quantity}</p>
          <Button label="Remove" onClick={() => handleRemove(item.product.id)} />
        </div>
      ))}
    </div>
  );
};

export default Cart;

