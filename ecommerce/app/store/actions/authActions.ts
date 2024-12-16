import { SET_FORM_DATA, RESET_FORM_DATA, SET_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CLEAR_ERROR } from '../actions/authTypes';

export const setFormData = (payload: { [key: string]: string }) => ({
  type: SET_FORM_DATA,
  payload,
});

export const resetFormData = () => ({
  type: RESET_FORM_DATA,
});

export const setError = (error: string) => ({
  type: SET_ERROR,
  payload: error,
});

export const loginSuccess = (user: { email: string, password: string }) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});
export const clearError = () => ({
  type: CLEAR_ERROR,
});