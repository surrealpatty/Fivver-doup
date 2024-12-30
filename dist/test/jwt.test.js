// src/test/jwt.test.ts
import { generateToken, verifyToken } from '../utils/jwt'; // Adjust the import path if necessary
// Example user object with the correct properties
const user = {
    id: '123',
    email: 'user@example.com',
    username: 'username',
    tier: 'paid',
    role: 'user',
};
// Generate and verify token
const token = generateToken(user);
console.log('Generated Token:', token);
const decoded = verifyToken(token);
console.log('Decoded User:', decoded);
// Optionally, you can also assert the expected decoded value here for testing purposes
if (decoded) {
    console.log('Token verified successfully:', decoded);
}
else {
    console.log('Token verification failed');
}
