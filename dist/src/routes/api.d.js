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
    checkAuth: function() {
        return _authMiddleware.checkAuth;
    },
    default: function() {
        return _default;
    }
});
const _authMiddleware = require("../middlewares/authMiddleware");
const _default = router;

//# sourceMappingURL=api.d.js.map