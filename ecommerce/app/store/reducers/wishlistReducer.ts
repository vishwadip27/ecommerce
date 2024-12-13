import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_WISHLIST_PRODUCTS } from '../actions/wishlistTypes';

interface wishListSate {
  wishListProducts: any[];
}

const initialState: wishListSate = {
  wishListProducts: [],
};

const wishListReducer = (state = initialState, action: any): wishListSate => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const updatedWishlistAdd = [...state.wishListProducts, action.payload];
      console.log("Current Wishlist State after ADD_TO_WISHLIST:", updatedWishlistAdd);
      return {
        ...state,
        wishListProducts: updatedWishlistAdd,
      };

    case REMOVE_FROM_WISHLIST:
      const updatedWishlistRemove = state.wishListProducts.filter(
        (product) => product.id !== action.payload
      );
      console.log("Current Wishlist State after REMOVE_FROM_WISHLIST:", updatedWishlistRemove);
      return {
        ...state,
        wishListProducts: updatedWishlistRemove,
      };

    case SET_WISHLIST_PRODUCTS:
      console.log("Current Wishlist State after SET_WISHLIST_PRODUCTS:", action.payload);
      return {
        ...state,
        wishListProducts: action.payload,
      };

    default:
      return state;
  }
};

export default wishListReducer;
