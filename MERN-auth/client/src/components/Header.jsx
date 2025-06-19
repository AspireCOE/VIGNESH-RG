import React, { useContext } from 'react';
import './Header.css'
import { AppContent } from '../context/AppContext.jsx';

const Header = () => {
    const {userData}=useContext(AppContent)
  return (
    <div className='header'>
        <h3>Welcome to our App {userData?userData.name:''}!</h3>
        <button>Get Started</button>
    </div>
  );
};

export default Header;
