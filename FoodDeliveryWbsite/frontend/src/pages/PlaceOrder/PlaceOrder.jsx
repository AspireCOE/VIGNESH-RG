import React, { useContext, useEffect } from 'react';
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

const PlaceOrder = () => {
  const {getTotalCartAmount,countNumber,token,url,setCount}=useContext(StoreContext);
  const navigate=useNavigate();
  const [data,setData]=useState({
    email:"",
    street:"",
    city:"",
    state:"",
    pinCode:"",
    country:""
  })

  useEffect(() => {
    if(!countNumber){
      navigate("/cart");
      toast.warn("Add Any Food Item First")
    }
    if(!token){
      navigate("/cart");
      toast.warn("Login to continue!");
    }
  });

  const onChangeHandler=(e)=>{
    const {name,value}=e.target;
    setData((prev)=>({
      ...prev,
      [name]:value
    }))
  }


  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/order/process`,
        { address: data },
        { headers: { token } }
      );
  
      if (response.data.success) {
        toast.success("Order placed successfully!");
        navigate("/verify");
        setCount({});
        
      } else {
        toast.error(response.data.message || "Payment failed!");
        console.log(response.data.message || "Payment failed!")
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error! Please try again.");
    }
  }
  

  return (
    <div className='place-order' id='place-order' >
        <form onSubmit={onSubmitHandler} className='place-order-form1'>
        <div className="place-order-form">
          <h2>Delivery Information</h2>
          <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder='Email' required/>
          <input onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder='Street' required/>
          <div className="state-city">
            <input onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' required/>
            <input onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' required />
          </div>
          <div className="pincode-country">
            <input onChange={onChangeHandler} name='pinCode' value={data.pinCode} type="text" placeholder='Pin code' required/>
            <input onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' required />
          </div>
          <input type="text" placeholder='Phone' required /></div>
        <div className="cart-total">
        <div>
        <h2>Cart Totals</h2>
        <hr />
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{getTotalCartAmount()}</p>
        </div>
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>free!</p>
        </div>
        <div className="cart-total-details">
          <p>Total</p>
          <p>{getTotalCartAmount()}</p>
        </div>
        <button type='submit'>Proceed To Payment</button>
        </div></div>
        </form>
      </div>
  )
}

export default PlaceOrder