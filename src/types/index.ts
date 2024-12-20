// src/types/index.ts

// Define UserPayload interface
export interface UserPayload {
  id: string;              // Required: User ID
  email: string;           // Now required: Email (string)
  username?: string;       // Optional: Username (string or undefined)
  tier: 'free' | 'paid';   // Required: User's subscription tier
  role?: 'admin' | 'user'; // Optional: User's role (admin or user)
}

// Define OrderPayload interface
export interface OrderPayload {
  id: string;        // Required: Order ID
  userId: string;    // Required: User ID associated with the order
  serviceId: string; // Required: ID of the service for the order
  quantity: number;  // Required: Quantity of the service ordered
  totalPrice: number; // Required: Total price of the order
  status: string;    // Required: Status of the order (e.g., 'pending', 'completed')
  item: string;
  price: number;
}

// Define CustomAuthRequest interface for extending Express Request

export interface CustomAuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    username?: string;
    tier?: string;  // Assuming tier is a string; adjust if necessary
  };
}
