import React from 'react'
import { Hero } from '../components/Hero/Hero'
import { Popular } from '../components/Popular/Popular'
import { NewCollection } from '../components/NewCollection/NewCollection'
 import { Offers } from '../components/Offers/Offers'

export const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
       <Offers/>
      <NewCollection></NewCollection>
    </div>
  )
}
