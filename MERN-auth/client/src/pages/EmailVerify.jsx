import React, { useContext, useState } from 'react'
import './Login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EmailVerify = () => {

  const {backendUrl,userData,isLoggedin,getUserData}=useContext(AppContent);
  const navigate=useNavigate();

  const [otp,setOtp]=useState("");
  const verifyOtp=async(e)=>{
    e.preventDefault();
    try {
      if(otp.length<6){
        toast.error("Enter 6 digit Otp");
      }
      else{
        const {data}=await axios.post(backendUrl+'/api/auth/verify-email',{otp});
        if(data.success){
          toast.success(data.message);
          getUserData();
          navigate('/');
        }
        else{
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(()=>{
    userData && isLoggedin && userData.isAccountVerified && navigate('/')
  },[userData,isLoggedin])

  return (
    <div className='login'>
      <form onSubmit={verifyOtp} >
        <h2>Email Verify Otp</h2>
        <p>Enter the 6 digit otp sent to your email</p>
        <div>
          <input type="text" onChange={(e)=>setOtp(e.target.value)} value={otp} required maxLength={6} />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EmailVerify