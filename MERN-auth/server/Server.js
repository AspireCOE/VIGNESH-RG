import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/Mongodb.js";
import authRouter from "./routes/AuthRoutes.js";
import userRoutes from "./routes/userRotes.js";

const app=express();

const port =process.env.PORT || 4000;

connectDB();

const allowed=['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowed,credentials:true}));


app.get('/',(req,res)=>{
    res.send("API Working"); 
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRoutes);

app.listen(port,()=>{
    console.log(`Server started ${port}`);
});