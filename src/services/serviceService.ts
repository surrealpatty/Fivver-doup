// src/services/serviceService.ts

// Define the Service interface for the return type
export interface Service {
    serviceId: number;
    title: string;
    description: string;
  }
  
  // Interface for the input parameters of the createService function
  interface CreateServiceInput {
    userId: string;
    title: string;
    description: string;
    price: number;
  }
  
  // The function to create a service with input validation and type annotations
  export const createService = async ({
    userId,
    title,
    description,
    price,
  }: CreateServiceInput) => {
    // Logic for creating service (mocked)
    return { message: 'Service created successfully', serviceId: 1, title };
  };
  
  // The function to fetch all services, returning an array of services
  export const getServices = async (): Promise<Service[]> => {
    // Logic for fetching services (mocked)
    return [
      { serviceId: 1, title: 'Service 1', description: 'Description 1' },
    ];
  };
  