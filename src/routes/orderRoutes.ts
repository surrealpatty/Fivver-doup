// src/routes/orderRoutes.ts
import express, { Request, Response } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';  // Ensure correct import

const router = express.Router();

// Route to create an order
router.post('/', createOrder);

// Route to get all orders
router.get('/', getAllOrders);

// Route to get an order by its ID
router.get('/:id', getOrderById);

// Route to update an order by its ID
router.put('/:id', updateOrder);

// Route to delete an order by its ID
router.delete('/:id', deleteOrder);

export default router;
