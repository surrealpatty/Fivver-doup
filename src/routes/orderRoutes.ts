import express, { Request, Response } from 'express';
import { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrder, 
  deleteOrder 
} from '../controllers/orderController'; // Ensure this is correctly imported

const router = express.Router();

// Route to create an order
router.post('/', createOrder);  // Directly use the imported controller function

// Route to get all orders
router.get('/', getAllOrders);  // Directly use the imported controller function

// Route to get an order by its ID
router.get('/:id', getOrderById);  // Directly use the imported controller function

// Route to update an order by its ID
router.put('/:id', updateOrder);  // Directly use the imported controller function

// Route to delete an order by its ID
router.delete('/:id', deleteOrder);  // Directly use the imported controller function

export default router;
