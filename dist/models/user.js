"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const types_1 = require("../types"); // Import enums
const services_1 = require("./services"); // Import Service model
let User = class User extends sequelize_typescript_1.Model {
    // Remove the explicit `id` declaration to let Sequelize handle it
    // Sequelize will automatically generate and manage the `id` property as UUID
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
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(types_1.UserTier)),
        allowNull: false,
        defaultValue: types_1.UserTier.Free,
    }),
    __metadata("design:type", String)
], User.prototype, "tier", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(types_1.UserRole)),
        allowNull: false,
        defaultValue: types_1.UserRole.User,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", Object)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Object)
], User.prototype, "passwordResetTokenExpiry", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => services_1.Service),
    __metadata("design:type", Array)
], User.prototype, "services", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users', timestamps: true })
], User);
exports.default = User;
