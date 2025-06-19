import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  axios.defaults.withCredentials = true;

  const resetPasswordOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Verify OTP and reset password
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword });
      if (data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {!isEmailSent && (
        <div className='login'>
          <form onSubmit={resetPasswordOtp}>
            <h4>Enter your registered email address</h4>
            <input type="email" placeholder='Enter the Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )}

      {isEmailSent && !isOtpSent && (
        <div className='login'>
          <form onSubmit={(e) => { e.preventDefault(); setIsOtpSent(true); }}>
            <h4>Enter the OTP sent to your email</h4>
            <input type="text" placeholder='Enter the OTP' onChange={(e) => setOtp(e.target.value)} value={otp} required />
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Reset Password */}
      {isEmailSent && isOtpSent && (
        <div className='login'>
          <form onSubmit={resetPassword}>
            <h4>Enter your new password</h4>
            <input type="password" placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required />
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
