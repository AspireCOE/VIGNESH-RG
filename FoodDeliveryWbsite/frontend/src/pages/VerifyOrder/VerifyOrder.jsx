import React, { useContext, useEffect, useState } from 'react';
import './VerifyOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import {toast} from 'react-toastify';
import {assets} from '../../assets/assets.js'

const VerifyOrder = () => {

  const {url,token,food_list,setCountNumber}=useContext(StoreContext);
  const [data,setData]=useState([]);

  const fetchData=async()=>{ 
    try {
      const response = await axios.get(url + "/api/order/orders", { headers: { token } });
      // console.log("Order response:", response.data);
      if(!response.data.success){
        toast.error(response.data.message);
      }
      setData(response.data.data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(()=>{
    if(token){
      fetchData();
      setCountNumber(0);
    }
  },[token]);


  return (
    <div className='verify'>
      <h1>Your Orders</h1>
      <div className='verify-order'>
      {data?.map((order, index) => (
      <div className="items-items" key={index}>
      <img src={assets.parcel_icon} alt="" />
      <div className="order-infos">
      {food_list?.map((i) => {
        if (order.items?.[i._id] > 0) {
          return (
            <div className='order-info' key={i._id}>
              <p>{i.name} - {order.items[i._id]}</p>
            </div>
          );
        }
        return null;
      })}</div>
      <div className="order-status">
        {order.status}
      </div>
      <button onClick={fetchData}>
        trackOrder
      </button>
    </div>
  ))}
</div>

    </div>
  )
}

export default VerifyOrder