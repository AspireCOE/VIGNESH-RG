import express from "express";
import { 
    isAuthenticated, 
    login, 
    logout, 
    register, 
    resendOtp, 
    resetPassword, 
    sendVerifyOtp, 
    verifyEmail 
} from "../controllers/AuthController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-email", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", resendOtp);
authRouter.post("/reset-password", resetPassword);


export default authRouter;
