import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import './FoodItems.css';
import { StoreContext } from '../Context/StoreContext';

const FoodItems = ({id,name,description,price,image}) => {

  const {count,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className='food-list'>
      <div className="food-item-container">
        <div className="food-list-image">
            <img src={url+"/images/"+image} alt="" />
            </div>
            {!count?.[id] ? <div className="add">
              <img onClick={()=>{addToCart(id)}} src={assets.add_icon_white} alt="" />
            </div>: <div className="add-remove-icon">
              <img onClick={()=>removeFromCart(id)}  src={assets.remove_icon_red} alt="" />
              <p>{count[id]}</p>
              <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
            }
            </div>
            <div className="food-list-review">
            <h3>{name}</h3>
            <img src={assets.rating_starts} alt="" />
            </div>
            <div className="food-list-description">
                <p>{description}</p>
            </div>
            <h4 className='price'>$ {price}</h4>
    </div>
  )
}

export default FoodItems