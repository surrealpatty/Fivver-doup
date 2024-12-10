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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const userRouter = _express.default.Router();
// Correct route handler signature
userRouter.get('/', (req, res)=>{
    res.status(200).json({
        message: 'User routes are working!'
    });
});
const _default = userRouter;

//# sourceMappingURL=user.js.map