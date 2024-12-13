import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST,SET_WISHLIST_PRODUCTS} from './wishlistTypes';

export const addToWishlist = (product: any) => {
  return { type: ADD_TO_WISHLIST, payload: product};
};

export const removeFromWishlist = (productId: number) => {
  return { type: REMOVE_FROM_WISHLIST, payload: productId };
};

export const setWishlistedProducts = (wishListProducts: any[]) => {
  return {
    type: SET_WISHLIST_PRODUCTS,
    payload: wishListProducts,
  };
};
