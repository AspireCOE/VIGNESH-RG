import express from 'express';
import { allOrders, processOrder, updateStatus, userOrder } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/Auth.js';

const orderRouter=express.Router();

orderRouter.post("/process",authMiddleware,processOrder);
orderRouter.get("/orders",authMiddleware,userOrder);
orderRouter.get("/all",allOrders);
orderRouter.post("/update",updateStatus);

export default orderRouter;