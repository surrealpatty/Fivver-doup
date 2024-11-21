import express, { Request, Response, RequestHandler } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';

const router = express.Router();

// Route to create an order
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createOrder(req, res);
    if (!result) {
      res.status(500).json({ message: 'Error creating order' });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to get all orders
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllOrders(req, res);
    if (!result) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to get an order by its ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }

  try {
    const result = await getOrderById(req, res);
    if (!result) {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order with ID:', id, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to update an order by its ID
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }

  try {
    const result = await updateOrder(req, res);
    if (!result) {
      res.status(500).json({ message: 'Error updating order' });
    }
  } catch (error) {
    console.error('Error updating order with ID:', id, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Route to delete an order by its ID
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }

  try {
    const result = await deleteOrder(req, res);
    if (!result) {
      res.status(500).json({ message: 'Error deleting order' });
    }
  } catch (error) {
    console.error('Error deleting order with ID:', id, error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
