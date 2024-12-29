import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';  // Import Optional from Sequelize

// Define the UserAttributes interface which reflects the fields in the database
export interface UserAttributes {
  id: number;  // ID should be a number because you're using DataType.INTEGER
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

// Define the UserCreationAttributes interface for the creation attributes (excluding `id` as it is auto-incremented)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;  // Declare 'id' explicitly as a primary key

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
}

export default User;
