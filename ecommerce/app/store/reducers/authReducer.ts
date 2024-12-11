import { SET_FORM_DATA, RESET_FORM_DATA, SET_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CLEAR_ERROR } from '../actions/authTypes';

interface AuthState {
  formData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  };
  error: string;
  isLoggedIn: boolean;
  user: { email: string } | null;
}

const initialState: AuthState = {
  formData: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  },
  error: '',
  isLoggedIn: false, 
  user: null,       
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {...state, formData: { ...state.formData, ...action.payload } };
    case RESET_FORM_DATA:
      return { ...state, formData: { ...initialState.formData },error: '', };
    case SET_ERROR:
      return { ...state, error: action.payload};
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case LOGIN_SUCCESS:
      if (typeof window !== 'undefined') { localStorage.setItem('isLoggedIn', 'true'); localStorage.setItem('user', JSON.stringify(action.payload)); }
      return { ...state,isLoggedIn: true, user: action.payload, error: '' };
    case LOGIN_FAILURE:
      return {...state, isLoggedIn: false, user: null, error: action.payload };
    case LOGOUT:
      if (typeof window !== 'undefined') { localStorage.removeItem('isLoggedIn'); localStorage.removeItem('user'); }
      return { ...state, isLoggedIn: false, user: null, };
    default:
      return state;
  }
};

export default authReducer;
