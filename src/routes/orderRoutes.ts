import express, { Request, Response } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';  // Ensure the correct path to controller

const router = express.Router();

// Define the request body type for createOrder
interface CreateOrderRequest {
  userId: number;
  serviceId: number;
  orderDetails: string;
  status: string;
}

// Route to create an order
router.post(
  '/',
  async (req: Request<{}, {}, CreateOrderRequest>, res: Response) => {
    try {
      await createOrder(req, res);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Route to get all orders
router.get(
  '/',
  async (req: Request, res: Response) => {
    try {
      await getAllOrders(req, res);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Route to get an order by its ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    await getOrderById(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update an order by its ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    await updateOrder(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete an order by its ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteOrder(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
