import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import insta_icon from '../Assets/instagram_icon.png'
import pin_icon from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt=''/>
            <p>SHOPPER</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Product</li>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icon-container'>
                <img src={insta_icon} alt=''/>
            </div>
            <div className='footer-icon-container'>
                <img src={pin_icon} alt=''/>
            </div>
            <div className='footer-icon-container'>
                <img src={whatsapp} alt=''/>
            </div>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p>copyright @ 2024 - All rights reserved !</p>
        </div>
    </div>
  )
}
