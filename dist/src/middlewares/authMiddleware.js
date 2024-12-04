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
    authenticateToken: function() {
        return authenticateToken;
    },
    checkAuth: function() {
        return checkAuth;
    }
});
const authenticateToken = (req, res, next)=>{
// Your authentication logic here
};
const checkAuth = (req, res, next)=>{
    // Some logic for checking auth
    next();
};

//# sourceMappingURL=authMiddleware.js.map