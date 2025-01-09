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
const _user = /*#__PURE__*/ _interop_require_default(require("./user"));
const _services = require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
    userId;
    serviceId;
    orderDetails;
    status;
    item;
    quantity;
}
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    _sequelizetypescript.AutoIncrement,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.INTEGER),
    _ts_metadata("design:type", Number)
], Order.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_user.default),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.UUID),
    _ts_metadata("design:type", String)
], Order.prototype, "userId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_services.Service),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.UUID),
    _ts_metadata("design:type", String)
], Order.prototype, "serviceId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Order.prototype, "orderDetails", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Order.prototype, "status", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Order.prototype, "item", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.INTEGER),
    _ts_metadata("design:type", Number)
], Order.prototype, "quantity", void 0);
Order = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'orders',
        timestamps: true
    })
], Order);
const _default = Order;
