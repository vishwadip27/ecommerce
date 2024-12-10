import { loginSuccess, loginFailure } from './authActions';

export const loginUser = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        dispatch(loginSuccess(data)); 
      } else if (response.status === 400) {
        dispatch(loginFailure('Bad request: Invalid credentials'));
      } else if (response.status === 401) {
        dispatch(loginFailure('Unauthorized: Please check your login credentials'));
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message || 'Login failed'));
      }
    } catch (error) {
      dispatch(loginFailure('Network error'));
    }
  };
};
