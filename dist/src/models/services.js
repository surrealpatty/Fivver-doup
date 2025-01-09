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
    // Export the model using a default export
    default: function() {
        return _default;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _user = /*#__PURE__*/ _interop_require_default(require("./user"));
const _uuid = require("uuid");
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
class Service extends _sequelizetypescript.Model {
    title;
    description;
    price;
    userId;
    user;
    role;
    static async setDefaults(instance) {
        if (!instance.id) {
            instance.id = (0, _uuid.v4)(); // Generate UUID if not already set
        }
    }
}
_ts_decorate([
    _sequelizetypescript.PrimaryKey,
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.UUID,
        defaultValue: _sequelizetypescript.DataType.UUIDV4
    }),
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
    (0, _sequelizetypescript.ForeignKey)(()=>_user.default),
    (0, _sequelizetypescript.Column)(_sequelizetypescript.DataType.UUID),
    _ts_metadata("design:type", String)
], Service.prototype, "userId", void 0);
_ts_decorate([
    (0, _sequelizetypescript.BelongsTo)(()=>_user.default),
    _ts_metadata("design:type", typeof _user.default === "undefined" ? Object : _user.default)
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
_ts_decorate([
    (0, _sequelizetypescript.Column)({
        type: _sequelizetypescript.DataType.STRING,
        validate: {
            isIn: [
                [
                    'admin',
                    'user'
                ]
            ]
        },
        defaultValue: 'user'
    }),
    _ts_metadata("design:type", String)
], Service.prototype, "role", void 0);
_ts_decorate([
    _sequelizetypescript.BeforeCreate,
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], Service, "setDefaults", null);
Service = _ts_decorate([
    (0, _sequelizetypescript.Table)({
        tableName: 'services',
        timestamps: true
    })
], Service);
const _default = Service;
