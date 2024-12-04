// src/models/order.ts
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
        return Order;
    },
    default: function() {
        return _default;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class Order extends _sequelizetypescript.Model {
    // Remove the explicit 'id' definition, letting Sequelize manage it automatically
    userId;
    serviceId;
    orderDetails;
    status;
}
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.INTEGER),
    _ts_metadata("design:type", Number)
], Order.prototype, "userId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.INTEGER),
    _ts_metadata("design:type", Number)
], Order.prototype, "serviceId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Order.prototype, "orderDetails", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Order.prototype, "status", void 0);
Order = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'orders',
        timestamps: false
    })
], Order);
const _default = Order;

//# sourceMappingURL=order.js.map