var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { User } from './user'; // Import User model for foreign key relationship
import Service from '../models/services'; // Use default import
let Order = class Order extends Model {
    userId; // Foreign key to the user who made the order
    serviceId; // Foreign key to the service ordered
    orderDetails; // Details of the order
    status; // Status of the order (e.g., pending, completed)
    item; // The item related to the order
    quantity; // The quantity of the item ordered
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    ForeignKey(() => User) // Foreign key to User model
    ,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    ForeignKey(() => Service) // Foreign key to Service model
    ,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Order.prototype, "serviceId", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "orderDetails", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], Order.prototype, "item", void 0);
__decorate([
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Order.prototype, "quantity", void 0);
Order = __decorate([
    Table({ tableName: 'orders', timestamps: false }) // Disable timestamps if not using createdAt and updatedAt
], Order);
export { Order };
export default Order;
