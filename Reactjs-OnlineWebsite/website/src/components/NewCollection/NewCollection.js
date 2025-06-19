import React from 'react'
import './NewCollection.css'
import { Items } from '../Items/Items'
import new_collection from '../Assets/new_collections'

export const NewCollection = () => {
  return (
    <div className='newcollection'>
        <div className='space'/>
        <h1> New Collections</h1>
        <hr/>
        <div className='collections'>
            {new_collection.map((item,i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
