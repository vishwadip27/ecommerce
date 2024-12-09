import { loginSuccess, loginFailure } from './authActions';

export const loginUser = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(loginSuccess(data)); 
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message || 'Login failed')); 
      }
    } catch (error) {
      dispatch(loginFailure('Network error'));
    }
  };
};
