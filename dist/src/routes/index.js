"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the router as the default export
"default", {
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
// Create a router instance for handling service-related routes
const serviceRouter = _express.default.Router();
// Define your service-related routes here
serviceRouter.get('/', (req, res)=>{
    res.send('Service routes');
});
const _default = serviceRouter;

//# sourceMappingURL=index.js.map