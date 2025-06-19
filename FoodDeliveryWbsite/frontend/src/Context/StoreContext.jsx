import { createContext, useState} from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext=createContext();

const StoreContextProvider=(props)=>{

    const [count,setCount]=useState({});
    const url="http://localhost:3000";
    const [token,setToken]=useState("");
    const [countNumber,setCountNumber]=useState(0);
    const [food_list,SetFoodList]=useState([]);


    const addToCart= async(itemId)=>{
        if(!count[itemId]){
            setCountNumber(prev=>prev+1);
            setCount((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCountNumber(prev=>prev+1);
            setCount((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart=async(itemId)=>{
        setCountNumber(prev=>prev-1);
        setCount((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in count){
            let itemInfo=food_list.find((product)=>product._id===item);
            if (itemInfo) {
                totalAmount += itemInfo.price * count[item];
            }
        }
        return totalAmount;
    }

    const loadCart=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCount(response.data.cartData||{});
        const cartData = response.data.cartData || {};
        let totalItems = 0;
        for (let key in cartData) {
        totalItems += cartData[key];
        }
        setCountNumber(totalItems);
    }

    const fetchFoodList=async()=>{
        const response = await axios.get(url+"/api/food/list");
        SetFoodList(response.data.data);
    }

   useEffect(()=>{
    async function loadFoodList() {
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCart(localStorage.getItem("token"));
        }
    }
    loadFoodList();
   },[])
    

    const value={
        food_list,count,addToCart,removeFromCart,countNumber,getTotalCartAmount,url,token,setToken,setCount,setCountNumber
    };
    
    return(
        <StoreContext.Provider  value={value}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;