import React, { useContext } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {

  const navigate=useNavigate()

  const {userData,setUserData,setIsLoggedin,backendUrl}=useContext(AppContent);
  axios.defaults.withCredentials=true;
  const logout=async()=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate('/');

    } catch (err) {
      toast.error(err.message)
    }
  }

  const sendVerificationOtp=async()=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp');
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return ( 
    <div>
        <div className='navbar'>
            <h3>Home</h3>
            {userData?
            <div><button>{userData.name[0]}</button><p onClick={()=>logout()}>logout</p> {!userData.isAccountVerified&& <p onClick={sendVerificationOtp}>Verify email</p>}
            </div>:
            <div><button onClick={()=>navigate('/login')}>Login</button></div>
          }
        </div>
    </div>
  )
}

export default Navbar