import { SET_FORM_DATA, RESET_FORM_DATA, SET_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authTypes';

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
  // Get initial state from localStorage if available
  isLoggedIn: typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true',
  user: typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case RESET_FORM_DATA:
      return initialState;
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
      // Persist the login status and user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in localStorage
      }
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      // Remove user data and login status from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
      }
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
