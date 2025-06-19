import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SEC,{expiresIn:'7d'});
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const isExist=await userModel.findOne({email});
        if (!isExist) {
            return res.json({success:false,message:"User not exists"});
        }
        const isMatch=await bcrypt.compare(password,isExist.password)
        if(!isMatch){
            return res.json({success:false,message:"Provide the correct password"});
        }
        const token=createToken(isExist._id);
        return res.json({success:true,token});

    } catch (err) {
        return res.json({success:false,message:err.message});
    }

}

export const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        const isExist= await userModel.findOne({email});
        if(isExist){
            return res.json({success:false,message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Provide valid Email"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Please Enter a strong password"});
        }
        const salt=await bcrypt.genSalt(10); 
        const hasedpw=await bcrypt.hash(password,salt);

        const newuser= new userModel({
            name:name,
            email:email,
            password:hasedpw
        })

        const user=await newuser.save();
        const token=createToken(user._id);
        return res.json({success:true,token});

    } catch (err) {
        console.log(err);
        return res.json({success:false,message:err.message});
    }
}