"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateToken", {
    enumerable: true,
    get: function() {
        return generateToken;
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
// Extract configuration variables
const { JWT_SECRET, JWT_EXPIRATION } = getConfig();
const generateToken = (payload)=>{
    try {
        return _jsonwebtoken.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION || '1h'
        }); // Default to 1-hour expiration
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error generating token:', error.message);
        } else {
            console.error('Unknown error generating token');
        }
        throw new Error('Token generation failed');
    }
}; //
