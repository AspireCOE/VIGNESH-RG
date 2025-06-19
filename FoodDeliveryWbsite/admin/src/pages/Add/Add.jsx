import React, { useState } from 'react';
import axios from 'axios';
import './Add.css'
import { toast } from 'react-toastify';

const Add = () => {

    const[image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })
    const HandleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        const orders=new FormData();
        orders.append("name",data.name),
        orders.append("description",data.description),
        orders.append("category",data.category),
        orders.append("price",Number(data.price)),
        orders.append("image",image)

        const response=await axios.post("http://localhost:3000/api/food/add",orders);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false)
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add-food'>
        <form onSubmit={onSubmitHandler} className="add-food-form">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" placeholder='upload' name='image' />
            { image && <p>Selected File: {image.name}</p> }
            <input onChange={HandleChange} type="text" placeholder='Enter the name of dish' name='name' value={data.name} />
            <textarea onChange={HandleChange} value={data.description} name="description" placeholder='Write your content here' className="food-desc" rows="5"></textarea>
            <div className="add-category">
                <p>Product category</p>
                <select onChange={HandleChange} value={data.category} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <input onChange={HandleChange} value={data.price} type="Number" name='price' placeholder='Enter the price of dish' />
            <div className="food-button">
                <button type='submit' >ADD</button>
            </div>
        </form>
    </div>
  )
}

export default Add