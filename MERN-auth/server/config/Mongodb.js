import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DataBase Connected")
    });
    await mongoose.connect('mongodb://127.0.0.1:27017/mern-auth');
}

export default connectDB