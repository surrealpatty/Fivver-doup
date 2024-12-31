// src/test/testHelpers.ts
import jwt from 'jsonwebtoken';
// Helper function to create a mock JWT token
export const createMockUserToken = (userId) => {
    const payload = {
        id: userId,
        email: 'user@example.com', // Mock email, adjust as needed
        username: 'username', // Mock username, adjust as needed
    };
    const secretKey = 'your-secret-key'; // Use your secret key, replace with actual one for testing
    // Create the token with the payload and secret key
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};
//# sourceMappingURL=testHelpers.js.map