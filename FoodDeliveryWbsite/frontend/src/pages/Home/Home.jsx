import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header';
import ExploreMenu from '../../components/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay';

const Home = () => {
  const [menuSelection,setMenuSelection]=useState("All");
  return (
    <div>
        <Header/>
        <ExploreMenu menuSelection={menuSelection} setMenuSelection={setMenuSelection}/>
        <FoodDisplay menuSelection={menuSelection} />
    </div>
  )
}

export default Home;