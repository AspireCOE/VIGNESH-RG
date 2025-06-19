import React from 'react';
import './Orders.css'
import { assets } from '../../../../frontend/src/assets/assets';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {toast} from 'react-toastify';

const Orders = () => {


  const [data,setData]=useState([]);
  const [list,setList]=useState([]);
    const fetchList=async()=>{
      const response= await axios.get("http://localhost:3000/api/food/list");
      if(response.data.success){
        setList(response.data.data);
      }
      else{
        toast.error(response.data.message)
      }
    }

  const fetchData=async()=>{
    const response=await axios.get("http://localhost:3000/api/order/all");
    console.log(response.data.data);
    setData(response.data.data);
  }

  const onChangeHandler=async(e,orderId)=>{
    const response=await axios.post("http://localhost:3000/api/order/update",{orderId,status:e.target.value});
    if(response.data.success){
      await fetchData();
    }
  }

  useEffect(()=>{
    fetchData();
    fetchList();
  },[])

  return (
    <div className='orders'>
      <h2>All Orders</h2>
      <div className="all-orders">
        <div className="orders-items">
          {data?.map((item, index) => {
            return (
            <div className="orders-items-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div className="order-items-item-quantity">
                {list?.map((i) => {
                  if (item.items[i._id] > 0) {
                    return (
                      <div key={i._id}>
                        {i.name} - {item.items[i._id]}
                      </div>
                    );
                  }
                    return null;
                })}
              </div>
              <div className="order-address">
                <p>{item.address.street}</p>
                <p>{item.address.city}</p>
                <p>{item.address.state}</p>
                <p>{item.address.country}</p>
              </div>
              <div className="order-status">
                <select onChange={(e)=>onChangeHandler(e,item._id)} value={item.status}  >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
    );
  })}
</div>

      </div>
    </div>
  )
}

export default Orders