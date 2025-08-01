import foodModel from "../model/foodModel.js";
import fs from 'fs';


export const addFood=async(req,res)=>{


    let image_filename=`${req.file.filename}`
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food added"});
    } catch (err) {
        console.log("error"+err); 
        res.json({success:false,message:err.message});
    }
}

export const listFood=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.json({success:true,data:foods});
        
    } catch (err) {
        res.json({success:false,message:err.message});
    }
}

export const removeFood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food deleted"});
    } catch (err) {
        res.json({success:false,message:err.message});
    }
}