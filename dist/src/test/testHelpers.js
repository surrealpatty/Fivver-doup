// src/test/testHelpers.ts
// Helper function to create a mock JWT token
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createMockUserToken", {
    enumerable: true,
    get: function() {
        return createMockUserToken;
    }
});
const createMockUserToken = (userId)=>{
    // Logic to create a mock token, for example:
    const payload = {
        id: userId
    };
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = Buffer.from(JSON.stringify(payload)).toString('base64') + '.' + Buffer.from(secretKey).toString('base64');
    return token;
};

//# sourceMappingURL=testHelpers.js.map