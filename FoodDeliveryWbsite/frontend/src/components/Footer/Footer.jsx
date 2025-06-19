import React from 'react';
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1>Food Delivery</h1>
                <div className="footer-social-icons">
                    <InstagramIcon />
                    <FacebookIcon/>
                    <XIcon/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About US</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>To be  Contact our service</h2>
                <ul>
                    <li>+91 9876543210</li>
                <li>fooddelivery@contact.com</li>
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Footer;
