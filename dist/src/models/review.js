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
exports.Review = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user"); // Import the User model to set up foreign key relationship
let Review = class Review extends sequelize_typescript_1.Model {
    userId; // Declare userId as a string for UUID
    content; // Review content
};
exports.Review = Review;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User) // Foreign key to User model
    ,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID) // userId should be UUID to match User's id type
    ,
    __metadata("design:type", String)
], Review.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
exports.Review = Review = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'reviews', timestamps: true }) // Enable timestamps if you want to track createdAt and updatedAt
], Review);
exports.default = Review;
