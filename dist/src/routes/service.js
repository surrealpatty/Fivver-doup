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
const _serviceController = require("../controllers/serviceController");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Define a route for services
router.get('/services', _serviceController.ServiceController.getServices); // Ensure this matches the route you're testing
const _default = router;

//# sourceMappingURL=service.js.map