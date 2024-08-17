import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Style from './changePassword.module.css'; // Importing the CSS module
import 'react-toastify/dist/ReactToastify.css';
import { changePass } from '../util/roughts.js';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const savePassword = async (e) => {
    e.preventDefault();
    if (newPassword) {
      try {
        const result = await axios.post(changePass, { id, newPassword });
        if (result.data.status === true) {
          toast.success('Password changed successfully');
          setTimeout(()=>{
            navigate('/login')
          },1000)

        } else {
          toast.error(result.data.message || 'An error occurred');
        }
      } catch (error) {
        toast.error('Failed to change password. Please try again later.');
      }
    } else {
      toast.error('Password cannot be empty');
    }
  };

  return (
    <div className={Style.container}>
      <h2>Change Password</h2>
      <form onSubmit={savePassword}>
        <div className={Style.formGroup}>
          <p>Reset password for user ID: {id}</p>
        </div>
        <div className={Style.formGroup}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <ToastContainer className={Style.toastContainer} />
    </div>
  );
};

export default ChangePassword;
