"use strict";
// src/config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = void 0;
// You can either use an environment variable or a default value for the JWT secret
exports.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
//# sourceMappingURL=config.js.map