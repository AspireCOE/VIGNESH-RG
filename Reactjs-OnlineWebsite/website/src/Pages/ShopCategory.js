import React from 'react'
import './ShopCategory.css'
// import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import {Items} from "../components/Items/Items";
import all_product from '../components/Assets/all_product';


export const ShopCategory = (props) => {
  // const {all_product}= useContext(ShopContext);
  
  return (
    <div className='shop-category'>
      <img className='shopCategory-banner' src={props.banner} alt="" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopCategory-Sort'>
          Sort by <img src={dropdown_icon} alt=''  />
        </div>
      </div>
      <div className='shopCategory-products' >
        {all_product.map((item,i)=>{
          if(item.category===props.category){
          return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
        else{
          return null;
        }}
        )}
      </div>

    </div>
  )
}
