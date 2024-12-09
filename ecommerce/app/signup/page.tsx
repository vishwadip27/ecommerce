'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetFormData, setError } from '../store/actions/authActions';
import { RootState } from '../store/reducers';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Signup = () => {
  const formData = useSelector((state: RootState) => state.auth.formData);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    dispatch(setFormData({ [name]: value }));
  };
  const handleBack = () => {
    router.push('/login');  
  };
  const validateForm = () => {
    const { firstname, lastname, email, password, confirmPassword, phoneNumber } = formData;

    if (!firstname || !lastname || !email || !password || !confirmPassword || !phoneNumber) {
      dispatch(setError('All fields are required'));
      return false;
    }
    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      dispatch(setError('Invalid email format'));
      return false;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      dispatch(setError('Phone number must be 10 digits'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:8000/users', formData);
      dispatch(resetFormData());
      router.push('/login');
    } catch (err) {
      dispatch(setError('Registration failed. Please try again.'));
    }
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center">
      <form onSubmit={handleSubmit} className="p-fluid p-card" style={{ width: '400px' }}>
        <h2>Sign Up</h2>
        {['firstname', 'lastname', 'email', 'password', 'confirmPassword', 'phoneNumber'].map((field) => (
          <div className="p-field" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <InputText
              id={field}
              name={field}
              type={field.includes('password') ? 'password' : 'text'}
              value={(formData as any)[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        ))}
        <Button label="Sign Up" type="submit" className="p-mt-2" />
        <Button label="Back to Login" onClick={handleBack} className="p-mt-2 p-button-secondary" />
        {error && <Message severity="error" text={error} className="p-mt-2" />}
      </form>
    </div>
  );
};

export default Signup;