import React, { useEffect, useState } from 'react';
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

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

  useEffect(()=>{
    fetchList()
  },[])

  const removeFood=async(id)=>{
    const response=await axios.post("http://localhost:3000/api/food/remove",{id:id});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }

  return (
    <div className='list add flex-col'>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b className='list-item-name'>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={"http://localhost:3000/images/"+item.image} alt='' />
              <p className='list-item-name'>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>{removeFood(item._id)}}>-</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List