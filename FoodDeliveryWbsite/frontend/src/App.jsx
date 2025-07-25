import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import FoodDisplay from './components/FoodDisplay';
import {ToastContainer} from 'react-toastify'
import VerifyOrder from './pages/VerifyOrder/VerifyOrder'

const App = () => {

  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></> }
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/menu' element={<FoodDisplay/>}/>
        <Route path='/verify' element={<VerifyOrder/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}
export default App