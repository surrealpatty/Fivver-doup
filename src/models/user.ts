import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Service } from './services'; // Assuming you have a Service model
import { UserRole, UserTier } from '../types/UserRoles'; // Import enums for role and tier

// Define the attributes for the User model
export interface UserAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  tier: UserTier;
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
}

// Define the attributes required for creating a User
export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table({
  tableName: 'users', // Specify the table name
  timestamps: true, // Enable createdAt and updatedAt
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  // Primary key
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  // Email column
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  // Username column
  @AllowNull(false)
  @Column(DataType.STRING)
  username!: string;

  // Password column
  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  // Role column
  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(UserRole)))
  role!: UserRole;

  // Tier column
  @AllowNull(false)
  @Default(UserTier.Free)
  @Column(DataType.ENUM(...Object.values(UserTier)))
  tier!: UserTier;

  // IsVerified column
  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  // Password reset token column
  @Column(DataType.STRING)
  passwordResetToken!: string | null;

  // Password reset token expiry column
  @Column(DataType.DATE)
  passwordResetTokenExpiry!: Date | null;

  // CreatedAt column
  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date; // Use declare to avoid overwriting the base property

  // UpdatedAt column
  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date; // Use declare to avoid overwriting the base property

  // Define the relationship with the Service model
  @HasMany(() => Service)
  services!: Service[];
}
