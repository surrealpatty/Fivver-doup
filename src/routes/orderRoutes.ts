import express, { Request, Response } from 'express';
import { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrder, 
  deleteOrder 
} from '../controllers/orderController';  // Ensure the path is correct

const router = express.Router();

// Route to create an order
router.post('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    return createOrder(req, res);  // Pass the request and response to the controller
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Route to get all orders
router.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    return getAllOrders(req, res);  // Pass the request and response to the controller
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Route to get an order by its ID
router.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid order ID' });  // Validate order ID
  }

  try {
    return getOrderById(req, res);  // Pass the request and response to the controller
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Route to update an order by its ID
router.put('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid order ID' });  // Validate order ID
  }

  try {
    return updateOrder(req, res);  // Pass the request and response to the controller
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Route to delete an order by its ID
router.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid order ID' });  // Validate order ID
  }

  try {
    return deleteOrder(req, res);  // Pass the request and response to the controller
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
