"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUserToken = void 0;
// Import necessary dependencies
var jsonwebtoken_1 = require("jsonwebtoken"); // Import jsonwebtoken for token generation
// Function to generate a mock JWT token for a user
var createMockUserToken = function (user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, // Payload
    'your_secret_key', // Secret key (should be stored securely, not hardcoded)
    { expiresIn: '1h' } // Token expiration time
    );
};
exports.createMockUserToken = createMockUserToken;
