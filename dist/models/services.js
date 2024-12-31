var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Ensure reflect-metadata is imported to enable decorators
import 'reflect-metadata';
import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import User from './user'; // Import User model
let Service = class Service extends Model {
    title;
    description;
    price;
    userId;
    user;
};
__decorate([
    PrimaryKey,
    Column(DataType.STRING) // Use STRING for UUID if you're using UUIDs
    ,
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], Service.prototype, "title", void 0);
__decorate([
    Column(DataType.TEXT),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    Column(DataType.FLOAT),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    ForeignKey(() => User) // Foreign key to User
    ,
    Column(DataType.STRING) // Ensure the foreign key is of the same type as User's id (string for UUIDs)
    ,
    __metadata("design:type", String)
], Service.prototype, "userId", void 0);
__decorate([
    BelongsTo(() => User) // Define association to User
    ,
    __metadata("design:type", User)
], Service.prototype, "user", void 0);
__decorate([
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Service.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Service.prototype, "updatedAt", void 0);
Service = __decorate([
    Table({ tableName: 'services', timestamps: true })
], Service);
export { Service };
export default Service;
//# sourceMappingURL=services.js.map