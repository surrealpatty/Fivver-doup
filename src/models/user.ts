import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Service from './services'; // Import the Service model

// Define the UserAttributes interface which reflects the fields in the database
export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  tier: string;
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the UserCreationAttributes interface for the creation attributes (excluding `id` as it is auto-generated)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  @PrimaryKey
  @Column(DataType.STRING) // Use STRING for UUID
  declare id: string;

  @Column(DataType.STRING)
  username!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  tier!: string;

  @Column(DataType.STRING)
  role!: string;

  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.STRING)
  passwordResetToken?: string | null;

  @Column(DataType.DATE)
  passwordResetTokenExpiry?: Date | null;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;

  /**
   * Automatically generate UUID for new user records
   */
  @BeforeCreate
  static assignUuid(user: User): void {
    user.id = uuidv4();
  }

  // Define the association to the Service model
  @HasMany(() => Service) // A User has many Services
  services!: Service[];
}

export default User;
