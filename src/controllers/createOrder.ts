import { Request, Response } from 'express';
import { User } from '../models/user';  // Import the User model
import { Service } from '../models/service';  // Import the Service model correctly
import { Order } from '../models/order';  // Import the Order model

// Order creation controller method
const createOrder = async (req: Request, res: Response) => {
  const { userId, serviceId, orderDetails, status, item, quantity } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);  // Find the user by primary key (id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });  // Return a 404 error with message
    }

    // Check if the service exists
    const service = await Service.findByPk(serviceId); // Find the service by primary key (id)

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });  // Return a 404 error for service not found
    }

    // Prepare the data for the order to match the Order model type
    const orderData = {
      userId,        // Foreign key referring to the user
      serviceId,     // Foreign key referring to the service
      orderDetails,  // Additional details about the order
      status,        // Status of the order
      item,          // Item being ordered
      quantity,      // Quantity of the item
    };

    // Create the order
    const order = await Order.create(orderData);

    return res.status(201).json(order);  // Return the created order as a response
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export default createOrder;
