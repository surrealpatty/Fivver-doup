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
const _checkIfPaidUser = /*#__PURE__*/ _interop_require_default(require("../middlewares/checkIfPaidUser"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Apply the checkIfPaidUser middleware to this route
router.get('/premium-service', _checkIfPaidUser.default, (req, res)=>{
    // If the middleware passes, this route is executed for paid users
    res.status(200).json({
        message: 'You have access to the premium service.'
    });
});
const _default = router;
