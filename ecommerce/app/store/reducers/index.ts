  import { combineReducers } from 'redux';
  import authReducer from './authReducer';
  import cartReducer from './cartReducer';

  const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
  });

  export type RootState = ReturnType<typeof rootReducer>;
  export default rootReducer;