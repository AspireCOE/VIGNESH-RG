import React, { useContext, useState } from 'react'
import "./Navbar.css"
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
export const Navbar = () => {
  const [menu,setMenu]=useState("Shop");
  const{getTotalCartitems}=useContext(ShopContext);
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <h1>E-Commerce</h1>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("men")}}><Link to='/mens'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("women")}}><Link to='/womens'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
            <button><Link to='/login'>Login</Link></button>
            <Link to='/cart'><img src={cart_icon} alt=''/></Link>
            <div className='nav-cart-count'>{getTotalCartitems()}</div>
        </div>
    </div>
  )
}
