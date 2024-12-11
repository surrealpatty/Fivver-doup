"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUserToken = void 0;
// Import necessary dependencies
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for token generation
// Function to generate a mock JWT token for a user
const createMockUserToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, username: user.username }, // Payload
    'your_secret_key', // Secret key (should be stored securely, not hardcoded)
    { expiresIn: '1h' } // Token expiration time
    );
};
exports.createMockUserToken = createMockUserToken;
//# sourceMappingURL=testHelpers.js.map