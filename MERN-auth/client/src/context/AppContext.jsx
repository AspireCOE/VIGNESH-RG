import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent= createContext();

export const AppContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState=async()=>{
        try {
            axios.defaults.withCredentials=true;
            const {data}=await axios.get(backendUrl+"/api/auth/is-auth");
            if(data.success){
                setIsLoggedin(true);
                await getUserData()
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    
    const getUserData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/data')
            data.success?setUserData(data.userData):toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getAuthState();
    },[])

    const value={backendUrl,isLoggedin,setIsLoggedin,userData,setUserData,getUserData};
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}