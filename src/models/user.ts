import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, CreatedAt, UpdatedAt, BeforeCreate } from 'sequelize-typescript';
import { Optional } from 'sequelize';  // Import Optional from Sequelize
import { v4 as uuidv4 } from 'uuid';  // Import uuidv4 for generating UUIDs

// Define the UserAttributes interface which reflects the fields in the database
export interface UserAttributes {
  id: string;  // ID should be a string (UUID)
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
  @Column(DataType.STRING)  // Change type to STRING for UUID
  declare id: string;  // Declare 'id' as a string (UUID)

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

  // Use declare modifier to avoid overwriting base properties
  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;  // Declare 'createdAt' to avoid TypeScript conflict

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;  // Declare 'updatedAt' to avoid TypeScript conflict

  /**
   * Automatically generate UUID for new user records
   */
  @BeforeCreate
  static assignUuid(user: User): void {
    user.id = uuidv4();  // Automatically generate UUID for new user records
  }
}

export default User;
