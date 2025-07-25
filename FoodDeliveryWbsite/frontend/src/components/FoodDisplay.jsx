import React, { useContext } from 'react';
import './FoodDisplay.css'
import { StoreContext } from '../Context/StoreContext';
import FoodItems from './FoodItems';

const FoodDisplay = ({menuSelection}) => {

    const {food_list}=useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes for You</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              if(menuSelection==="All" ){
                return <FoodItems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              }  
              else if(item.category===menuSelection) {
                return <FoodItems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay