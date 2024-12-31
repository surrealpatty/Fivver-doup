var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasMany, } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Service } from './services'; // Import the Service model
let User = class User extends Model {
    username;
    email;
    password;
    tier;
    isVerified;
    passwordResetToken;
    passwordResetTokenExpiry;
    /**
     * Automatically generate UUID for new user records
     */
    static assignUuid(user) {
        user.id = uuidv4(); // Generate UUID if not already provided
    }
    // Define the association to the Service model
    services;
    // Additional method to handle role assignment logic (optional)
    setRole(role) {
        if (!['free', 'paid'].includes(role)) {
            throw new Error('Invalid role assignment');
        }
        this.role = role;
    }
};
__decorate([
    PrimaryKey,
    Column(DataType.UUID) // UUID for ID
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
    Column({
        type: DataType.STRING,
        defaultValue: 'free', // Default role is 'free'
        validate: {
            isIn: [['free', 'paid']], // Only allow 'free' or 'paid' as valid roles
        },
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "tier", void 0);
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
    HasMany(() => Service) // A User has many Services
    ,
    __metadata("design:type", Array)
], User.prototype, "services", void 0);
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
