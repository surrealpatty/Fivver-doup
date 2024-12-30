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
    User: function() {
        return User;
    },
    default: function() {
        return _default;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _uuid = require("uuid");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class User extends _sequelizetypescript.Model {
    username;
    email;
    password;
    tier;
    role;
    isVerified;
    passwordResetToken;
    passwordResetTokenExpiry;
    /**
   * Automatically generate UUID for new user records
   */ static assignUuid(user) {
        user.id = (0, _uuid.v4)(); // Automatically generate UUID for new user records
    }
}
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "id", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "username", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "password", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "tier", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "role", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.BOOLEAN),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", Object)
], User.prototype, "passwordResetToken", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.DATE),
    _ts_metadata("design:type", Object)
], User.prototype, "passwordResetTokenExpiry", void 0);
_ts_decorate([
    _sequelizetypescript.CreatedAt,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.DATE),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "createdAt", void 0);
_ts_decorate([
    _sequelizetypescript.UpdatedAt,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.DATE),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "updatedAt", void 0);
_ts_decorate([
    _sequelizetypescript.BeforeCreate,
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], User, "assignUuid", null);
User = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'users',
        timestamps: true
    })
], User);
const _default = User;

//# sourceMappingURL=user.js.map