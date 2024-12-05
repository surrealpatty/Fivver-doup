// src/test/testHelpers.ts

// Helper function to create a mock JWT token
export const createMockUserToken = (userId: string): string => {
    // Logic to create a mock token, for example:
    const payload = { id: userId };
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = Buffer.from(JSON.stringify(payload)).toString('base64') + '.' + Buffer.from(secretKey).toString('base64');
    return token;
  };
  