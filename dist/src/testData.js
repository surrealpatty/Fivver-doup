"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = /*#__PURE__*/ _interop_require_default(require("./models/user"));
const _services = require("./models/services");
const _types = require("./types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function createTestUserAndService() {
    try {
        // Insert a test user with the necessary attributes
        const userAttributes = {
            email: 'test@example.com',
            password: 'hashedPasswordHere',
            username: 'testuser',
            tier: _types.UserTier.Free,
            role: _types.UserRole.User,
            isVerified: false
        };
        // Create the user using the attributes
        const createdUser = await _user.default.create(userAttributes);
        console.log('User created:', createdUser);
        // Optionally, insert a test service for the created user
        const service = await _services.Service.create({
            title: 'Web Development',
            description: 'Full-stack web development services.',
            price: 500,
            userId: createdUser.id.toString(),
            role: _types.UserRole.User
        });
        console.log('Service created:', service); // Log service creation
    } catch (error) {
        console.error('Error:', error); // Catch and log any errors
    }
}
createTestUserAndService();
