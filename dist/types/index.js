"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
// Type guard to ensure req.user is of type UserPayload
const isUser = (user) => {
    return (user && typeof user.id === 'string');
};
exports.isUser = isUser;
//# sourceMappingURL=index.js.map