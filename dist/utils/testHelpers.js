// Import necessary dependencies
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
// Function to generate a mock JWT token for a user
export const createMockUserToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username }, // Payload
    'your_secret_key', // Secret key (should be stored securely, not hardcoded)
    { expiresIn: '1h' } // Token expiration time
    );
};
//# sourceMappingURL=testHelpers.js.map