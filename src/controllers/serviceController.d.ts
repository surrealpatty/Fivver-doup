import { Request, Response } from 'express';
import  Service  from '../models/service'; // Assuming the Service model exists

// Interface for creating a new service
export interface CreateServiceRequest extends Request {
  body: {
    userId: number;
    title: string;
    description: string;
    price: number;
  };
}

// Interface for updating a service
export interface UpdateServiceRequest extends Request {
  params: {
    id: string; // Service ID as a string (since it's passed in the URL)
  };
  body: {
    title?: string;
    description?: string;
    price?: number;
  };
}

// Define controller methods
export interface ServiceController {
  createService(req: CreateServiceRequest, res: Response): Promise<Response>;
  updateService(req: UpdateServiceRequest, res: Response): Promise<Response>;
  getService(req: Request, res: Response): Promise<Response>;
  deleteService(req: Request, res: Response): Promise<Response>;
}
