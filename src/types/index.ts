// Exporting the types from their respective files if they exist
export * from './UserPayload';  // Assuming you have UserPayload.ts
export * from './OrderPayload';  // Assuming you have OrderPayload.ts

// Ensure that the Order type is defined here if it's not being imported
export interface Order {
  id: string;         // Order ID
  userId: string;     // ID of the user who placed the order
  item: string;       // Item being ordered
  quantity: number;   // Quantity of the item
  price: number;      // Price of the item
  status?: string;    // Optional status field (e.g., 'pending', 'completed')
  createdAt?: string; // Optional created date
  serviceId: string;  // Service ID related to the order
  amount: number;     // Amount of the order
}

// Ensure that UserPayload is properly defined and exported if it's not imported
export interface UserPayload {
  id: string;
  email: string;      // Make sure email is required
  username?: string;  // Optional, assuming it's not required
  tier: 'free' | 'paid';  // Define the tier (free/paid)
  role?: 'admin' | 'user'; // Optional, defining roles
  orderId: string;        // Associated order ID
  userId: string;         // Associated user ID
  serviceId: string;      // Associated service ID
  amount: number;         // Amount in the order
  status: string;         // Status of the order
}

// Assuming OrderPayload is defined elsewhere, but adding it here for consistency
export interface OrderPayload {
  id: string;       // Order ID
  userId: string;   // ID of the user who placed the order
  item: string;     // Item being ordered
  quantity: number; // Quantity of the item
  price: number;    // Price of the item
  // Add any other fields specific to OrderPayload as needed
}

// Ensure that the AuthRequest and CustomAuthRequest types are exported
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user field (user may not exist on every request)
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // user is now required and must follow the UserPayload type
}

// Type guard to check if the user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
