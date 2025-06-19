import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Object,
        default:{},
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food Prossing"
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const orderModel = mongoose.model.order || mongoose.model("order",orderSchema);

export default orderModel;