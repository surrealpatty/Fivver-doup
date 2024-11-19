import express, { Request, Response } from 'express';
import { sequelize } from '../config/database';
import { Service } from '../models/services'; // or appropriate path
import User from '../models/user';

const router = express.Router();

// CREATE: Add a new service
router.post('/services', async (req: Request, res: Response) => {
  const { userId, name, description, price } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new service
    // src/models/service.ts
name: {
  type: DataTypes.STRING,
  // src/routes/api.ts
{
  allowNull: false, // Ensure this is part of a valid object definition
  type: DataTypes.STRING, // Example property

  const Service: any = sequelize.define('Service', {
    // Define fields here
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }); // Ensure proper closure
  
    // Add proper structure here
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }); // Ensure proper closure of the object and parentheses
  
  // Add valid model attributes here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

    type: DataTypes.STRING,
    allowNull: false, // Adjust based on your requirements
  },
})
}

    return res.status(201).json(service); // Return the newly created service
  // src/routes/api.ts
try {
  const result = await Service.create(req.body);
  res.status(201).send(result);
} catch (error) {
  res.status(500).send({ error: error.message });
}

    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
// src/routes/review.routes.ts
router.get('/profile', authMiddleware, async (req: UserRequest, res: Response) => {
  // Some code here
  res.status(200).send({ message: 'Success' }); // Ensure response is properly closed
});


// READ: Get all services
router.get('/services', async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });
    return res.status(200).json(services); // Return all services
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// READ: Get a specific service by ID
router.get('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number

  try {
    const service = await Service.findOne({
      where: { id: serviceId }, // Use the `where` clause with primary key
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE: Update a service
router.put('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number
  const { name, description, price } = req.body;

  try {
    const service = await Service.findByPk(serviceId); // Now using the correct type for the id
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.name = name || service.name; // Ensure name is a property of Service model
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save(); // Save the updated service
    return res.status(200).json(service); // Return the updated service
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE: Delete a service
router.delete('/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceId = parseInt(id, 10); // Convert id to number

  try {
    const service = await Service.findByPk(serviceId); // Correct id type passed
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy(); // Delete the service
    return res.status(204).send(); // Return no content (204) status after deletion
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
