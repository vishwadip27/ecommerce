import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART } from '../actions/cartTypes';

interface CartState {
  items: { product: any; quantity: number }[];
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state = initialState, action: any): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state, items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state, items: state.items.filter(item => item.product.id !== action.payload),
      };
    case SET_CART:
      return {...state, items: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
