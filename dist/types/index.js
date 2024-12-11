"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
// Type guard function to ensure req.user is typed as UserPayload
const isUser = (user) => {
    return user && typeof user.id === 'string' && typeof user.tier === 'string'; // Adjust the condition based on your user model
};
exports.isUser = isUser;
//# sourceMappingURL=index.js.map