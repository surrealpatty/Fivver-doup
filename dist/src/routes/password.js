// src/routes/password.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _passwordController = require("../controllers/passwordController");
const _validatePasswordReset = require("../middlewares/validatePasswordReset");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Route for password reset
router.post('/reset', _validatePasswordReset.validatePasswordReset, _passwordController.resetPassword);
const _default = router;
