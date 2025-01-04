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
const verifyToken = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer token" format
    if (!token) {
        return res.status(403).json({
            message: 'No token provided'
        });
    }
    // Ensure config.JWT_SECRET is typed as a string
    const jwtSecret = _config.default[process.env.NODE_ENV || 'development'].JWT_SECRET; // Access JWT_SECRET from the correct environment config
    // Verify the token using the secret from config
    _jsonwebtoken.default.verify(token, jwtSecret, (err, decoded)=>{
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized',
                error: err.message
            });
        }
        // Ensure decoded payload is valid and contains an ID
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const decodedToken = decoded;
            req.userId = String(decodedToken.id); // Store the userId in the request object
            return next(); // Proceed to the next middleware
        } else {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
    });
};
const generateToken = (userId)=>{
    const jwtSecret = _config.default[process.env.NODE_ENV || 'development'].JWT_SECRET; // Access JWT_SECRET from the correct environment config
    return _jsonwebtoken.default.sign({
        id: userId
    }, jwtSecret, {
        expiresIn: _config.default[process.env.NODE_ENV || 'development'].JWT_EXPIRATION
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
