import React, { useEffect, useState } from 'react';
import Style from './forgot-password.module.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { checkOtp, forgotUser } from '../util/roughts.js';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(forgotUser, { email });
      if (result.data.status === false) {
        toast.error(result.data.message);
      } else {
        toast.success('Password reset code sent successfully');
        setShowOtpInput(true); 
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 5) {
      toast.error('OTP should be 5 digits');
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(checkOtp, { email, otp });
      if (result.data.status === true) {
        toast.success('OTP verified');
        console.log(result);
       
            navigate(`/resetPassword/${result.data.user}`);
      } else {
        toast.error('Invalid OTP or expired. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Reset Password</h2>
      <form onSubmit={sendCode}>
        <div className={Style.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type='email'
            id="email"
            name="email"
            placeholder='Enter your registered email'
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type='submit' className={Style.submitButton} disabled={loading}>
          {loading ? 'Sending...' : 'Send Code'}
        </button>
      </form>
      {showOtpInput && (
        <form onSubmit={handleOtpSubmit}>
          <div className={Style.inputGroup}>
            <label htmlFor='otp'>OTP</label>
            <input
              type='number'
              id='otp'
              name='otp'
              placeholder='Enter the OTP'
              onChange={handleOtpChange}
              required
              disabled={loading}
            />
          </div>
          <button type='submit' className={Style.submitButton} disabled={loading}>
            {loading ? 'Verifying...' : 'Submit OTP'}
          </button>
        </form>
      )}
      <ToastContainer />
    </>
  );
};

export default Forgotpassword;
