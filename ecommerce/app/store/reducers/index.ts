  import { combineReducers } from 'redux';
  import authReducer from './authReducer';
  import cartReducer from './cartReducer';
  import wishListReducer from './wishlistReducer';

  const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    whistlist: wishListReducer
  });

  export type RootState = ReturnType<typeof rootReducer>;
  export default rootReducer;