import React, { useContext, useState } from 'react'
import './Navbar.css';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const {countNumber,token,setToken}=useContext(StoreContext);
  const [menu,setMenu]=useState("All");
  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  }

  return (
    <div className='navbar' >
      <Link to='/'><h2 className='logo'>Food Delivery</h2></Link>
      <ul className="navbar-menu">
      <li onClick={()=>{setMenu("home"); navigate("/")}} className={menu==='home'?"active":""}>Home</li>
      <a href='#explore-menu' onClick={()=>{setMenu("menu")}} className={menu==='menu'?"active":""}>Menu</a>
      <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==='contact-us'?"active":""}>Contact-Us</a></ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt=''/>
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className="dot">{countNumber}</div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>: <div className='navbar-profile'> 
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/verify')}>Orders</li>
            <hr />
            <li onClick={logout}>Logout</li>
          </ul>
         </div> }
      </div>
    </div>
  )
}

export default Navbar