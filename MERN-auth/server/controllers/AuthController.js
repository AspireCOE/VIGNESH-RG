import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing data" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedpw = await bcrypt.hash(password, 10); 
        const user = new userModel({ name, email, password: hashedpw });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Test Email",
            text: "This is a test email"
        };
        
        await transporter.sendMail(mailOption);

        return res.json({ success: true });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });

        res.json({ success: true, message: "Logged Out" });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};

export const sendVerifyOtp=async(req,res)=>{
    try {
        const {userId}=req.body;
        console.log(userId)
        const user =await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({success: false, message: "Account already verified"})
        }
        else{
           const otp= String(Math.floor(100000+ (Math.random())*900000));
           user.verifyOtp=otp;
           user.verifyOtpExpireAt=Date.now()+24*60*60*1000
           await user.save();
           const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Test Email",
            text: `${otp}`
        };
        console.log(user.email+otp+user+mailOption);
        
        await transporter.sendMail(mailOption);
        return res.json({success:true,message:'otp successfully sent !'});
        }

    } catch (err) {
        res.json({success:false,message:err.message})
    }
}


export const verifyEmail=async(req,res)=>{
    const {userId,otp}=req.body;
    if(!userId || !otp){
        return res.json({
            success:false,
            message:"Missing details"
        })
    }
    else{
        try {
            const user=await userModel.findById(userId);
            if(!user){
                return res.json({success:false,message:'user not found'})
            }
            if(user.verifyOtp===''|| user.verifyOtp!==otp){
                return res.json({success:false,message:'Invalid Otp'})
            }
            if(user.verifyOtpExpireAt<Date.now()){
                return res.json({success:false,message:'Expired Otp'})
            }
            user.isAccountVerified=true;
            user.verifyOtp='';
            user.verifyOtpExpireAt=0;
            await user.save();
            return res.json({success:true,message:'Email verifed Successfull'});

        } catch (err) {
            return res.json({success:false,message:err.message})
        }
    }
}

export const isAuthenticated= async(req,res)=>{
    try {
        return res.json({success:true,message:"Verified User"})
    } catch (err) {
        return res.json({success:false,message:err.message})
    }
}

export const resendOtp= async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.json({success:false,message:"No email found"})
    }
    try {
        
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"Invalid email"})
        }
        const otp= String(Math.floor(100000+ (Math.random())*900000));
           user.resetOtp=otp;
           user.resetOtpExpireAt=Date.now()+24*60*60*1000
           await user.save();
           const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset Password !",
            text: `${otp}`
        };

        await transporter.sendMail(mailOption);
        return res.json({success:true,message:'otp successfully sent !'});

    } catch (err) {
        return res.json({success:false,message:err.message})
    }
}

export const resetPassword=async(req,res)=>{
    const {email,otp,newPassword}=req.body;
    if(!email||!otp||!newPassword){
        return res.json({success:false,message:"Missing Data"})
    }
    try {

        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"ivalid eamil"})
        }
        if(otp!==user.resetOtp){
            return res.json({success:false,message:"ivalid otp"})
        }
        if(user.resetOtpExpireAt<Date.now()){
            return res.json({success:false,message:"Otp expired!"})
        }
        const hased=await bcrypt.hash(newPassword,10);
        user.password=hased;
        user.resetOtp='';
        user.resetOtpVerifyAt=0;
        await user.save();
        return res.json({
            success:true,message:"password has been reseted successfully"
        })
        
    } catch (err) {
        return res.json({success:false,message:err.message})
    };
};

