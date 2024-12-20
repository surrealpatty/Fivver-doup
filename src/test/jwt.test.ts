// src/test/jwt.test.ts

import { generateToken, verifyToken } from '../utils/jwt';  // Adjust the import path if necessary
import { UserPayload } from '../types';  // Correctly import from '../types'

// Example user object with the correct properties
const user: UserPayload = {
  id: '123',
  email: 'user@example.com',
  username: 'username',
  tier: 'paid',
  role: 'user',
  orderId: 'order123',  // Valid as 'orderId' is part of UserPayload
  userId: 'user123',    // Valid as 'userId' is part of UserPayload
  serviceId: 'service123',
  amount: 50,
  status: 'active'
};

// Generate and verify token
const token = generateToken(user);
console.log('Generated Token:', token);

const decoded = verifyToken(token);
console.log('Decoded User:', decoded);

// Optionally, you can also assert the expected decoded value here for testing purposes
if (decoded) {
  console.log('Token verified successfully:', decoded);
} else {
  console.log('Token verification failed');
}
