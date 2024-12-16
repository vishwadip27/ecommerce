'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setError, loginSuccess, loginFailure, clearError } from '../store/actions/authActions';
import { RootState } from '../store/reducers';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import loginStyle from './login.module.scss';

const Login = () => {
  const formData = useSelector((state: RootState) => state.auth.formData);
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (password: string) => {
    if (!password) {
      dispatch(setError('Password is required'));
      return false;
    }
    if (!passwordRegex.test(password)) {
      dispatch(setError('Password must be at least 8 characters long , special character and contain both letters and numbers.'));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      dispatch(setError('Email and password are required'));
      return false;
    }
    if (!emailRegex.test(email)) {
      dispatch(setError('Invalid email format'));
      return false;
    }
    if (!validatePassword(password)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) router.push('/');
    dispatch(clearError());
  }, [dispatch, router]);

  const handleChange = (name: string, value: string) => {
    dispatch(setFormData({ [name]: value }));
    dispatch(clearError());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.get('http://localhost:8000/users');
      const user = response.data.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        dispatch(loginSuccess({ email: user.email , password: user.password }));
        router.push('/');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    } catch {
      dispatch(loginFailure('Login failed. Please try again.'));
    }
  };

  const redirectToSignup = () => {
    dispatch(clearError());
    router.push('/signup');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  return (
    <div className={loginStyle.loginWrapper}>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} className={loginStyle.loginFormWrapper}>
          <h2>Login</h2>
          <div className={loginStyle.inputwrapper}>
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className={loginStyle.inputwrapper}>
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <Button label="Login" type="submit" className={`${loginStyle.btn} ${loginStyle.btnWrapper}`} />
          {error && <Message severity="error" text={error} className={loginStyle.errorMessage} />}
          <p className="p-mt-2"> Don't have an account? <a onClick={redirectToSignup} style={{ cursor: 'pointer' }} className={loginStyle.signUpTxtclick}>Sign up</a> </p>
        </form>
      ) : (
        <div className="p-card">
          <h2>Welcome!</h2>
          <p>You are logged in.</p>
          <Button label="Logout" onClick={handleLogout} className="p-mt-2" />
        </div>
      )}
    </div>
  );
};

export default Login;
