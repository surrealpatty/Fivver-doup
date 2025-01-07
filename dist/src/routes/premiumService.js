"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the routes as a default export
"default" // Default export
, {
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
const premiumServiceRoutes = _express.default.Router();
// Define your routes here
premiumServiceRoutes.get('/', (req, res)=>{
    res.status(200).send('Premium service route');
});
const _default = premiumServiceRoutes;
