import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import fs from 'fs';



const foodRouter=express.Router();

const storage= multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload=multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);


export default foodRouter;