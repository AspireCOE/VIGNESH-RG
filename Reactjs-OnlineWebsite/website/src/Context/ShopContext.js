import React, { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    all_product.forEach((item) => {
        cart[item.id] = 0;
    });
    return cart;
};


const ShopContextProvider =(props)=>{
    // const contextValue={all_product}; 
    const [cartItems,setCartItems]=useState(getDefaultCart());
    //const contextValue={all_product,cartItems};

    const addToCart=(ItemId)=>{
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]+1}));
        // console.log("addtoCart"+ cartItems);
        
    }
    const removeFromCart=(ItemId)=>{
        setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price*cartItems[item];
            }
            
        }
        return totalAmount;
    }

    const getTotalCartitems=()=>{
        let totalProduct=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                totalProduct+=1;
            }
        }
        return totalProduct;
    }

    const contextValue={getTotalCartitems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;