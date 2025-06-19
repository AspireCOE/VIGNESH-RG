import React from 'react'
import './Hero.css'
import hero_img from '../Assets/hero_image.png'
export const Hero = () => { 
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>New Arrivals</h2>
            <div>
              <p>Collections For EveryOne</p>
            </div>
        </div>
        <div className='hero-right'>
            <img src={hero_img} alt=''/>
        </div>
    </div>
  )
}
