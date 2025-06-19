import React from 'react';
import "./LoginSignup.css";

export const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <div className='loginsignup-fields'>
          <input type='text' placeholder='Your Name'></input>
          <input type='email' placeholder='Enter your Email id' ></input>
          <input type='password' placeholder='Password' ></input>
          <button>Continue</button>
          <p className='loginsignup-login' > Already have an account <span>Login here</span></p>
          <div className='loginsignup-agree'>
            <input type='checkbox' name='' id=''></input>
            <p>By contining, i agree to the terms of use & privacy policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
