import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app=express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    res.send("Server is Running");
});

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));

app.use("/api/user",userRouter);

app.use("/api/cart",cartRouter);

app.use("/api/order",orderRouter);

app.listen(3000,()=>{
    console.log("Server is running in server 3000");
});