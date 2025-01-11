// src/models/user.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return User;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _types = require("../types");
const _services = require("./services");
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
    email;
    password;
    username;
    tier;
    role;
    isVerified;
    passwordResetToken;
    passwordResetTokenExpiry;
    // Define the one-to-many relationship with the Service model
    services;
}
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING,
        allowNull: false,
        unique: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING,
        allowNull: false
    }),
    _ts_metadata("design:type", String)
], User.prototype, "password", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING,
        allowNull: false
    }),
    _ts_metadata("design:type", String)
], User.prototype, "username", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.ENUM(...Object.values(_types.UserTier)),
        allowNull: false,
        defaultValue: _types.UserTier.Free
    }),
    _ts_metadata("design:type", typeof _types.UserTier === "undefined" ? Object : _types.UserTier)
], User.prototype, "tier", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.ENUM(...Object.values(_types.UserRole)),
        allowNull: false,
        defaultValue: _types.UserRole.User
    }),
    _ts_metadata("design:type", typeof _types.UserRole === "undefined" ? Object : _types.UserRole)
], User.prototype, "role", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Default)(false),
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.BOOLEAN
    }),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING,
        allowNull: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "passwordResetToken", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.DATE,
        allowNull: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "passwordResetTokenExpiry", void 0);
_ts_decorate([
    (0, _sequelizetypescript.HasMany)(()=>_services.Service),
    _ts_metadata("design:type", Array)
], User.prototype, "services", void 0);
User = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'users',
        timestamps: true
    })
], User);
