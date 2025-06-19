import userModel from "../model/userModel.js";

export const addToCart=async(req,res)=>{
    try {
        let userData=await userModel.findOne({_id:req.body.userId})
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
        }
        else{
        cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"});
    } catch (err) {
        res.json({success:false,message:err.message});
    }
}

export const removeFromCart=async(req,res)=>{
    try {
        
        let userData=await userModel.findOne({_id:req.body.userId})
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"});

    } catch (err) {
        res.json({success:false,message:err.message});
        
    }
}

export const getCart=async(req,res)=>{
    try {

        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData})

    } catch (err) {
        res.json({success:false,message:err.message});
    }
}