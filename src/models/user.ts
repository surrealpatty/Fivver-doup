// src/models/user.ts

import { Table, Model, Column, DataType, HasMany, Default } from 'sequelize-typescript'; 
import { UserRole, UserTier } from '../types'; // Import enums
import { Service } from './services'; // Import Service model

// Define the UserCreationAttributes interface
export interface UserCreationAttributes {
  email: string;
  username: string;
  password: string;
  role: UserRole;
  tier: UserTier;
  isVerified: boolean;
}

@Table({ tableName: 'users', timestamps: true })
export default class User extends Model<User, UserCreationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserTier)),
    allowNull: false,
    defaultValue: UserTier.Free,
  })
  tier!: UserTier;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.User,
  })
  role!: UserRole;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  isVerified!: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  passwordResetToken?: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  passwordResetTokenExpiry?: Date | null;

  // Define the one-to-many relationship with the Service model
  @HasMany(() => Service)
  services!: Service[];
}
