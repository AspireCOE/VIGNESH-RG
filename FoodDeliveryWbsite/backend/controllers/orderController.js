import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import transporter from "../config/nodemailer.js";

export const processOrder=async(req,res)=>{
    try {
        const userCart=await userModel.findById(req.body.userId)
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:userCart.cartData,
            address:req.body.address
        })
        if (!userCart.cartData || Object.keys(userCart.cartData).length === 0) {
            return res.json({ success: false, message: "Cart is empty. Cannot place order." });
          }
          
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const email=req.body.address.email;
        const mailContent={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Food Delivery",
            text:"Your Order has Been Placed"
        }

        await transporter.sendMail(mailContent);
        return res.json({success:true,message:"Payment Successfull"});
    } catch (err) {
        return res.json({success:false,message:err.message});
    }
}

export const userOrder=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        return res.json({success:true,data:orders});
    } catch (err) {
        return res.json({success:false,message:err.message});
    }
}

export const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        return res.json({success:true,data:orders});
    } catch (error) {
        return res.json({success:false,message:err.message});
    }
}

export const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        return res.json({success:true,message:"Updated Successfull"})
    } catch (err) {
        return res.json({success:false,message:err.message});
    }
}