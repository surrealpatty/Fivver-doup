// src/services/serviceService.ts

import { Service, User } from '../models'; // Import models from the appropriate path
import { Request, Response } from 'express'; // Correct import for request and response types

// Function to create a service
export const createService = async (serviceData: { userId: string, title: string, description: string, price: number }) => {
  try {
    const { userId, title, description, price } = serviceData;

    // Validate required fields
    if (!userId || !title || !description || price === undefined) {
      throw new Error('Missing required fields: userId, title, description, and price are mandatory.');
    }

    // Validate price
    if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
      throw new Error('Invalid price: must be a positive number.');
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    // Create the service
    const service = await Service.create({
      userId,
      title,
      description,
      price,
    });

    return {
      message: 'Service created successfully.',
      serviceId: service.id,
      title: service.title,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

// Function to get all services
export const getServices = async () => {
  try {
    // Fetch all services from the database
    const services = await Service.findAll(); // Assuming a basic fetch from the Service model
    return {
      message: 'Services fetched successfully.',
      services,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred while fetching services');
  }
};
