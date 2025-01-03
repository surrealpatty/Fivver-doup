// src/models/index.ts
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
    Order: function() {
        return _order.Order;
    },
    Review: function() {
        return _review.Review;
    },
    Service: function() {
        return _services.Service;
    },
    User: function() {
        return _user.default;
    }
});
const _user = /*#__PURE__*/ _interop_require_default(require("./user"));
const _services = require("./services");
const _order = require("./order");
const _review = require("./review");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
 // Exporting models
