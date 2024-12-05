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
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
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
class User extends _sequelizetypescript.Model {
    // Email with uniqueness and validation
    email;
    // Username with uniqueness and length restriction
    username;
    // Password storage
    password;
    // Role of the user (e.g., admin, user)
    role;
    // Subscription tier of the user (free or paid)
    tier;
    // Verified status of the user (default is false)
    isVerified;
    /**
   * Hashes the user's password.
   * @param password - The plain text password to hash.
   * @returns - The hashed password.
   */ static async hashPassword(password) {
        const salt = await _bcryptjs.default.genSalt(10);
        return _bcryptjs.default.hash(password, salt);
    }
    /**
   * Validates a user's input password against the stored hashed password.
   * @param storedPassword - The stored hashed password.
   * @param inputPassword - The plain text password provided by the user.
   * @returns - True if the passwords match; false otherwise.
   */ static async validatePassword(storedPassword, inputPassword) {
        return _bcryptjs.default.compare(inputPassword, storedPassword);
    }
}
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    _sequelizetypescript.AutoIncrement,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.INTEGER),
    _ts_metadata("design:type", Number)
], User.prototype, "id", void 0);
_ts_decorate([
    _sequelizetypescript.Unique,
    _sequelizetypescript.IsEmail,
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
    _sequelizetypescript.Unique,
    (0, _sequelizetypescript.Length)({
        min: 3,
        max: 20
    }),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "username", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "password", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Default)('user'),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "role", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Default)('free'),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.STRING),
    _ts_metadata("design:type", String)
], User.prototype, "tier", void 0);
_ts_decorate([
    (0, _sequelizetypescript.Default)(false),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.BOOLEAN),
    _ts_metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
User = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'users',
        timestamps: true
    })
], User);
const _default = User;

//# sourceMappingURL=user.js.map