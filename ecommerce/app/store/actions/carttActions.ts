import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART , INCREMENT_CART_ITEM, DECREMENT_CART_ITEM } from "./cartTypes";


export const addToCart = (product: any) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId: number) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const setCart = (cart: any[]) => ({
  type: SET_CART,
  payload: cart,
});

export const incrementCartItem = (productId: number) => ({
  type: INCREMENT_CART_ITEM,
  payload: productId,
});

export const decrementCartItem = (id: number) => {
  return {
    type: DECREMENT_CART_ITEM,
    payload: id,
  };
};

