import React, { useContext } from 'react';
import "./CartItems.css";
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from "../Assets/cart_cross_icon.png";


export const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext)
  return (
    <div className='cartitems'>
        <div className='cartitems-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {all_product.map((e)=>{
            if(cartItems && cartItems[e.id] > 0){
                return <div>
                <div className='cartitems-format cartitems-format-main'>
                    <img src={e.image} alt='' className='carticon-product-icon'/>
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                    <p>${e.new_price*cartItems[e.id]}</p>
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt=''/>
                </div>
                <hr/>
                </div>
            }
            else{
                return null;
            }
        })}
        <div className='cartitems-down'>
            <div className='cartitems-total'>
                <h1>Cart Totals</h1>
                <div>
                    <div className='cartitems-total-items' >
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    {/* <hr/> */}
                    <div className='cartitems-total-items'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr></hr>
                    <div className='cartitems-total-items'>
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed To CheckOut</button>
            </div>
        </div>
    </div>
  )
}
