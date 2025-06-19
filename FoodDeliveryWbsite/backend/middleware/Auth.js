import jwt from "jsonwebtoken";

export const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login"})
    }try {
        const token_decode=jwt.verify(token,process.env.JWT_SEC);
        req.body.userId=token_decode.id;
        next();
    } catch (err) {
        return res.json({success:false,message:err.message})
    }
}