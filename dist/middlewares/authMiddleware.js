"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const authenticateToken = (req, res, next) => {
    // Your logic to authenticate and attach user to req.user
    if (req.user) {
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authMiddleware.js.map