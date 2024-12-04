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
const _orderController = require("../controllers/orderController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Route to create an order
router.post('/', async (req, res)=>{
    try {
        await (0, _orderController.createOrder)(req, res);
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
// Route to get all orders
router.get('/', async (req, res)=>{
    try {
        await (0, _orderController.getAllOrders)(req, res);
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
// Route to get an order by its ID
router.get('/:id', async (req, res)=>{
    try {
        await (0, _orderController.getOrderById)(req, res);
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
// Route to update an order by its ID
router.put('/:id', async (req, res)=>{
    try {
        await (0, _orderController.updateOrder)(req, res);
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
// Route to delete an order by its ID
router.delete('/:id', async (req, res)=>{
    try {
        await (0, _orderController.deleteOrder)(req, res);
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
const _default = router;

//# sourceMappingURL=orderRoutes.js.map