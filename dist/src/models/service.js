"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Service;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _user = require("./user");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class Service extends _sequelizetypescript.Model {
    title;
    description;
    price;
    userId;
}
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Service.prototype, "title", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Service.prototype, "description", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.FLOAT),
    _ts_metadata("design:type", Number)
], Service.prototype, "price", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_user.User),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.INTEGER),
    _ts_metadata("design:type", Number)
], Service.prototype, "userId", void 0);
Service = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'services'
    })
], Service);

//# sourceMappingURL=service.js.map