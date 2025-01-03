// Ensure reflect-metadata is imported to enable decorators
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
    Service: function() {
        return Service;
    },
    // Export the Service model
    default: function() {
        return _default;
    }
});
require("reflect-metadata");
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
    user;
}
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Service.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Service.prototype, "title", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.TEXT),
    _ts_metadata("design:type", String)
], Service.prototype, "description", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.FLOAT),
    _ts_metadata("design:type", Number)
], Service.prototype, "price", void 0);
_ts_decorate([
    (0, _sequelizetypescript.ForeignKey)(()=>_user.User),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], Service.prototype, "userId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.BelongsTo)(()=>_user.User),
    _ts_metadata("design:type", typeof _user.User === "undefined" ? Object : _user.User)
], Service.prototype, "user", void 0);
_ts_decorate([
    _sequelizetypescript.CreatedAt,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.DATE),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Service.prototype, "createdAt", void 0);
_ts_decorate([
    _sequelizetypescript.UpdatedAt,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.DATE),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Service.prototype, "updatedAt", void 0);
Service = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'services',
        timestamps: true
    })
], Service);
// Define the association between Service and User explicitly
Service.belongsTo(_user.User, {
    foreignKey: 'userId'
});
_user.User.hasMany(Service, {
    foreignKey: 'userId'
}); // Define the reverse association (optional)
const _default = Service;
