"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.authenticateToken = void 0;
const authenticateToken = (req, res, next) => {
    // Your authentication logic here
};
exports.authenticateToken = authenticateToken;
const checkAuth = (req, res, next) => {
    // Some logic for checking auth
    next();
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=authMiddleware.js.map