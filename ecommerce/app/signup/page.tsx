'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetFormData, setError, clearError } from '../store/actions/authActions';
import { RootState } from '../store/reducers';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';  
import signUpStyle from './signup.module.scss';

const Signup = () => {
  const formData = useSelector((state: RootState) => state.auth.formData);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false); 

  const handleBack = () => {
    dispatch(clearError());
    dispatch(resetFormData());
    router.push('/login');
  };

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const phoneNumberRegex = /^[0-9]{10}$/;
  const passwordMatchRegex = (password: string, confirmPassword: string) => password === confirmPassword;
  const nameRegex = /^[A-Za-z\s-']+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    const { firstname, lastname, email, password, confirmPassword, phoneNumber } = formData;

    if (!firstname || !lastname || !email || !password || !confirmPassword || !phoneNumber) {
      dispatch(setError('All fields are required'));
      return false;
    }
    if (!nameRegex.test(firstname)) {
      dispatch(setError('First name should only contain letters, spaces, hyphens, or apostrophes.'));
      return false;
    }
    if (!nameRegex.test(lastname)) {
      dispatch(setError('Last name should only contain letters, spaces, hyphens, or apostrophes.'));
      return false;
    }
    if (!passwordMatchRegex(password, confirmPassword)) {
      dispatch(setError('Passwords do not match'));
      return false;
    }
    if (!passwordRegex.test(password)) {
      dispatch(setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'));
      return false;
    }
    if (!emailRegex.test(email)) {
      dispatch(setError('Invalid email format'));
      return false;
    }
    if (!phoneNumberRegex.test(phoneNumber)) {
      dispatch(setError('Phone number must be 10 digits'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    if (!validateForm()) return;
    try {
      await axios.post('http://localhost:8000/users', formData);
      dispatch(resetFormData());
      setShowDialog(true); 
    } catch (err) {
      dispatch(setError('Registration failed. Please try again.'));
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    router.push('/login');
  };

  return (
    <div className={signUpStyle.signUpWrapper}>
      <form onSubmit={handleSubmit} className={signUpStyle.signUpFormWrapper}>
        <h2>Sign Up</h2>
        {/* Form fields */}
        <div className={signUpStyle.inputwrapper}>
          <label htmlFor="firstname">First Name</label>
          <InputText
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={(e) => dispatch(setFormData({ ...formData, firstname: e.target.value }))} />
        </div>
        <div className={signUpStyle.inputwrapper}>
          <label htmlFor="lastname">Last Name</label>
          <InputText
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={(e) => dispatch(setFormData({ ...formData, lastname: e.target.value }))} />
        </div>
        <div className={signUpStyle.inputwrapper}>
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => dispatch(setFormData({ ...formData, email: e.target.value }))} />
        </div>
        <div className={signUpStyle.inputwrapper}>
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => dispatch(setFormData({ ...formData, password: e.target.value }))} />
        </div>
        <div className={signUpStyle.inputwrapper}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <InputText
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => dispatch(setFormData({ ...formData, confirmPassword: e.target.value }))} />
        </div>
        <div className={signUpStyle.inputwrapper}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <InputText
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => dispatch(setFormData({ ...formData, phoneNumber: e.target.value }))} />
        </div>
        <Button label="Sign Up" type="submit" className={`${signUpStyle.btn} ${signUpStyle.btnWrapper}`} />
        <Button label="Back to Login" onClick={handleBack} className={`${signUpStyle.btn} ${signUpStyle.btnLogin}`} />
        {error && <Message severity="error" text={error} className={`${signUpStyle.errorMessage}`} />}

        {/* Dialog Component */}
        <Dialog
          header="Success"
          visible={showDialog}
          onHide={handleDialogClose}
          style={{ width: '50vw' }}
        >
          <p>Registration Successful! You can now login.</p>
          <Button label="Go to Login" onClick={handleDialogClose} />
        </Dialog>
      </form>
    </div>
  );
};

export default Signup;
