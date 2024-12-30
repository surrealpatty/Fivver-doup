// src/test/jwt.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _jwt = require("../utils/jwt");
// Example user object with the correct properties
const user = {
    id: '123',
    email: 'user@example.com',
    username: 'username',
    tier: 'paid',
    role: 'user'
};
// Generate and verify token
const token = (0, _jwt.generateToken)(user);
console.log('Generated Token:', token);
const decoded = (0, _jwt.verifyToken)(token);
console.log('Decoded User:', decoded);
// Optionally, you can also assert the expected decoded value here for testing purposes
if (decoded) {
    console.log('Token verified successfully:', decoded);
} else {
    console.log('Token verification failed');
}

//# sourceMappingURL=jwt.test.js.map