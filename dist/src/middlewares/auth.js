"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    authenticateJWT: function() {
        return authenticateJWT;
    },
    generateToken: function() {
        return generateToken;
    },
    verifyToken: function() {
        return verifyToken;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _config = /*#__PURE__*/ _interop_require_default(require("../config/config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Utility function to get the configuration for the current environment
const getConfig = ()=>{
    const env = process.env.NODE_ENV || 'development';
    if (env in _config.default) {
        return _config.default[env];
    }
    throw new Error(`Invalid NODE_ENV: ${env}`);
};
const verifyToken = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer token" format
    if (!token) {
        return res.status(403).json({
            message: 'No token provided'
        });
    }
    const { JWT_SECRET } = getConfig();
    _jsonwebtoken.default.verify(token, JWT_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized',
                error: err.message
            });
        }
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.userId = decoded.id; // Store the userId in the request object
            return next(); // Proceed to the next middleware
        } else {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
    });
};
const generateToken = (userId)=>{
    const { JWT_SECRET, JWT_EXPIRATION } = getConfig();
    return _jsonwebtoken.default.sign({
        id: userId
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION
    });
};
const authenticateJWT = (req, res, next)=>{
    if (!req.userId) {
        return res.status(403).json({
            message: 'No valid token or userId found.'
        });
    }
    next(); // User authenticated, proceed to the next middleware or route handler
};
