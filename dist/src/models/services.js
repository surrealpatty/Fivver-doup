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
exports.Service = void 0;
require("reflect-metadata");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user"); // Correct import of User model with named import
let Service = class Service extends sequelize_typescript_1.Model {
    title;
    description;
    price;
    userId;
    user;
};
exports.Service = Service;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING) // Use STRING for UUID if you're using UUIDs
    ,
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Service.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User) // Foreign key to User
    ,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING) // Ensure the foreign key is of the same type as User's id (string for UUIDs)
    ,
    __metadata("design:type", String)
], Service.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User) // Define association to User
    ,
    __metadata("design:type", user_1.User)
], Service.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Service.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Service.prototype, "updatedAt", void 0);
exports.Service = Service = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'services', timestamps: true })
], Service);
// Export the Service model
exports.default = Service;
