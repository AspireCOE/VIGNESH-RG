import React, { useContext, useState } from 'react';
import './LoginPopup.css'
import CancelIcon from '@mui/icons-material/Cancel';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";
import { toast } from 'react-toastify';

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken}=useContext(StoreContext);
    const [currState,setCurrState]=useState('Sign-Up')
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const onLogin=async(e)=>{
        e.preventDefault();
        let newUrl=url;
        if (currState==="Sign-Up") {
            newUrl=newUrl+"/api/user/register"
        } else {
            newUrl = newUrl+"/api/user/login"
        }
        const response= await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
            toast.success("Login Successfull")
        }
        else{
            toast.error(response.data.message);
        }
    };

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <div className='close-login-popup' onClick={()=>setShowLogin(false)} >
                    <CancelIcon/>
                </div>
            </div>
            <div className="login-popup-inputs">
                {currState!=='Login' && <input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='Enter Your Name' required />}
                <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Enter Your Email id' required />
                <input onChange={onChangeHandler} name='password' value={data.password} type='password' placeholder='Enter Your password' required/>
            </div>
            {currState==='Sign-Up'&& <div className='login-popup-condition'>
                <input type="checkbox" required/>
                <p>By continuing , i agree to the terms and conditions</p>
            </div>}
            <button type='submit'>{currState}</button>
            {currState==='Login'?<p onClick={()=>setCurrState('Sign-Up')}>Create new account ?</p>:
            <p onClick={()=>setCurrState('Login')}>Already have an account ?</p>}
        </form>
    </div>
  )
}

export default LoginPopup