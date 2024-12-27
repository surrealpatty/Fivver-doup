// src/routes/service.ts
import express from 'express';
import {
  createServiceController,
  getServicesController,
} from '../controllers/serviceController'; // Corrected import to use controller functions

const router = express.Router();

// Route to create a service
router.post('/', createServiceController); // Use the controller for service creation

// Route to get all services
router.get('/', getServicesController); // Use the controller for fetching services

export default router;
