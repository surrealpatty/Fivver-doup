var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
let Review = class Review extends Model {
    userId;
    content;
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Review.prototype, "userId", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
Review = __decorate([
    Table({ tableName: 'reviews' })
], Review);
export { Review };
//# sourceMappingURL=review.js.map