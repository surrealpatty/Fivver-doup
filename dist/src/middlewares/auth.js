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
const JWT_SECRET = _config.default.JWT_SECRET;
const JWT_EXPIRATION = _config.default.JWT_EXPIRATION || '1h';
const verifyToken = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            message: 'No token provided'
        });
    }
    _jsonwebtoken.default.verify(token, JWT_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized',
                error: err.message
            });
        }
        // Handle decoding and verifying the JWT payload
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const decodedToken = decoded;
            // Cast decodedToken.id to string (if necessary)
            req.userId = String(decodedToken.id); // Explicitly cast to string
            return next();
        } else {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
    });
};
const generateToken = (userId)=>{
    return _jsonwebtoken.default.sign({
        id: userId
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION
    });
};
const authenticateJWT = (req, res, next)=>{
    // Check if userId exists in request
    if (!req.userId) {
        return res.status(403).json({
            message: 'No valid token or userId found.'
        });
    }
    next();
};

//# sourceMappingURL=auth.js.map