// Define the Service interface for the return type
export interface Service {
  serviceId: number;
  title: string;
  description: string;
}

// Interface for the input parameters of the createService function
interface CreateServiceInput {
  userId: string;  // This will be used for associating the service with a user
  title: string;
  description: string;
  price: number;  // This will be used to store the price of the service
}

// The function to create a service with input validation and type annotations
export const createService = async ({
  userId,
  title,
  description,
  price,
}: CreateServiceInput) => {
  // Logic for creating service (mocked)
  // We now use userId, description, and price in the mocked logic
  console.log(`Creating service for user ${userId} with title: ${title}, description: ${description}, and price: ${price}`);

  // Mock response
  return { message: 'Service created successfully', serviceId: 1, title, description, price };
};

// The function to fetch all services, returning an array of services
export const getServices = async (): Promise<Service[]> => {
  // Logic for fetching services (mocked)
  return [
    { serviceId: 1, title: 'Service 1', description: 'Description 1' },
  ];
};
