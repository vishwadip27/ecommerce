'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setError, loginSuccess, loginFailure } from '../store/actions/authActions';
import { RootState } from '../store/reducers';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Login = () => {
  const formData = useSelector((state: RootState) => state.auth.formData);
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    dispatch(setFormData({ [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      dispatch(setError('Email and password are required'));
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      dispatch(setError('Invalid email format'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.get('http://localhost:8000/users');
      const user = response.data.find((u: any) => u.email === formData.email && u.password === formData.password);

      if (user) {
        dispatch(loginSuccess({ email: user.email }));
        router.push('/');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    } catch (err) {
      dispatch(loginFailure('Login failed. Please try again.'));
    }
  };

  const redirectToSignup = () => {
    router.push('/signup');
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} className="p-fluid p-card" style={{ width: '400px' }}>
          <h2>Login</h2>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <Button label="Login" type="submit" className="p-mt-2" />
          {error && <Message severity="error" text={error} className="p-mt-2" />}
          <p className="p-mt-2">
            Don't have an account? <a onClick={redirectToSignup} style={{ cursor: 'pointer' }}>Sign up</a>
          </p>
        </form>
      ) : (
        <div className="p-card" style={{ width: '400px', textAlign: 'center' }}>
          <h2>Welcome!</h2>
          <p>You are logged in.</p>
          <Button label="Logout" onClick={handleLogout} className="p-mt-2" />
        </div>
      )}
    </div>
  );
};

export default Login;
