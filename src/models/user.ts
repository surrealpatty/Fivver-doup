import 'reflect-metadata';  // Required for decorators
import { 
  Table, 
  Column, 
  Model, 
  PrimaryKey, 
  DataType, 
  CreatedAt, 
  UpdatedAt, 
  BeforeCreate, 
  HasMany 
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Service } from './services'; // Correct named import for Service model
import { UserTier, UserRole } from '../types'; // Import UserTier and UserRole from src/types

// Define the UserAttributes interface which reflects the fields in the database
export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  tier: UserTier;
  isVerified: boolean;
  passwordResetToken?: string | null;
  passwordResetTokenExpiry?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the UserCreationAttributes interface for creation attributes (excluding `id` as it is auto-generated)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({ tableName: 'users', timestamps: true }) // Define the table and timestamp fields
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  @PrimaryKey
  @Column(DataType.UUID) // Use UUID for the ID
  declare id: string;

  @Column(DataType.STRING)
  username!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'user', // Default role is 'user'
    validate: {
      isIn: [['user', 'admin']], // Allow only 'user' or 'admin' as valid roles
    },
  })
  declare role: UserRole;

  @Column({
    type: DataType.ENUM('free', 'paid'), // Enum for UserTier (with literal values)
    allowNull: false, // Ensure tier is not nullable
    defaultValue: 'free', // Default to 'free' tier
  })
  tier!: UserTier;

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
    user.id = uuidv4(); // Generate UUID if not already provided
  }

  // Define the association to the Service model
  @HasMany(() => Service) // A User has many Services
  services!: Service[];

  /**
   * Set the role of the user, ensuring it is valid.
   * @param role - The role to assign ('user' or 'admin').
   */
  setRole(role: UserRole): void {
    if (!['user', 'admin'].includes(role)) {
      throw new Error('Invalid role assignment');
    }
    this.role = role;
  }
}

// Export UserRole and UserTier so that they are available for other files
export { UserRole, UserTier };
