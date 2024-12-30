var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, BeforeCreate } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating UUIDs
let User = class User extends Model {
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
     */
    static assignUuid(user) {
        user.id = uuidv4(); // Automatically generate UUID for new user records
    }
};
__decorate([
    PrimaryKey,
    Column(DataType.STRING) // Change type to STRING for UUID
    ,
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "tier", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Column(DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", Object)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    Column(DataType.DATE),
    __metadata("design:type", Object)
], User.prototype, "passwordResetTokenExpiry", void 0);
__decorate([
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], User, "assignUuid", null);
User = __decorate([
    Table({ tableName: 'users', timestamps: true })
], User);
export { User };
export default User;
