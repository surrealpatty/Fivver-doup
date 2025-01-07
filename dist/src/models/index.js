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
        return _user.User;
    }
});
const _user = require("./user");
const _services = require("../models/services");
const _order = require("./order");
const _review = require("./review");
 // Exporting models
