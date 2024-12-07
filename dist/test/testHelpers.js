"use strict";
// src/test/testHelpers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUserToken = void 0;
// Helper function to create a mock JWT token
var createMockUserToken = function (userId) {
    // Logic to create a mock token, for example:
    var payload = { id: userId };
    var secretKey = 'your-secret-key'; // Replace with your actual secret key
    var token = Buffer.from(JSON.stringify(payload)).toString('base64') + '.' + Buffer.from(secretKey).toString('base64');
    return token;
};
exports.createMockUserToken = createMockUserToken;
