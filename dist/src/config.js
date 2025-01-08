// src/config.ts
// You can either use an environment variable or a default value for the JWT secret
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jwtSecret", {
    enumerable: true,
    get: function() {
        return jwtSecret;
    }
});
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set in the environment variables. Using fallback value.');
}
