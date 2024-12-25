// src/controllers/serviceController.ts
import { Request, Response } from 'express';
import { createService, getServices } from '../services/serviceService'; 

export const createServiceController = async (req: Request, res: Response) => {
  try {
    const { userId, title, description, price } = req.body;
    const result = await createService({ userId, title, description, price });

    res.status(201).json({
      message: result.message,
      serviceId: result.serviceId,
      title: result.title,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unknown error occurred while creating the service.',
    });
  }
};

export const getServicesController = async (req: Request, res: Response) => {
  try {
    const result = await getServices();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unknown error occurred while fetching services.',
    });
  }
};
