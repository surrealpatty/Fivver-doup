import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { UserRole, UserTier } from '../types';  // Import enums for role and tier
import { Service } from './services';  // Assuming you have a Service model

// Define the User model
@Table({ tableName: 'users', timestamps: true })
export default class User extends Model<User> {
  // Declare 'id' to avoid TypeScript overwriting the base class property
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(UserTier),
    defaultValue: UserTier.Free,
  })
  tier!: UserTier;

  @Column({
    type: DataType.ENUM,
    values: Object.values(UserRole),
    defaultValue: UserRole.User,
  })
  role!: UserRole;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerified!: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  passwordResetToken!: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  passwordResetTokenExpiry!: Date | null;

  // Define the relationship with the Service model
  static associate() {
    this.hasMany(Service, {
      foreignKey: 'userId',
      as: 'services',
    });
  }
}

// Initialize associations
User.associate();
