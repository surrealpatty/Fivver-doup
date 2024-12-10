// src/routes/orderRoutes.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Other routes follow the same pattern...
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _orderController = require("../controllers/orderController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Define the handler types
const createOrderHandler = async (req, res)=>{
    try {
        await (0, _orderController.createOrder)(req, res);
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};
// Route to create an order
router.post('/', createOrderHandler);
const _default = router;

//# sourceMappingURL=orderRoutes.js.map