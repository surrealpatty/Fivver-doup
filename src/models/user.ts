import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, IsEmail, Length, Default } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

// Define the attributes required to create a user
export interface UserCreationAttributes {
  email: string;
  username: string;
  password: string;
  role?: string; // Optional role field
  tier?: string; // Optional tier field
  isVerified?: boolean; // Optional verified field
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User, UserCreationAttributes> {
  // Primary key for the user
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  // Email with uniqueness and validation
  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email!: string;

  // Username with uniqueness and length restriction
  @Unique
  @Length({ min: 3, max: 20 })
  @Column(DataType.STRING)
  username!: string;

  // Password storage
  @Column(DataType.STRING)
  password!: string;

  // Role of the user (e.g., admin, user)
  @Default('user')
  @Column(DataType.STRING)
  role!: string;

  // Subscription tier of the user (free or paid)
  @Default('free')
  @Column(DataType.STRING)
  tier!: string;

  // Verified status of the user (default is false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  /**
   * Hashes the user's password.
   * @param password - The plain text password to hash.
   * @returns - The hashed password.
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Validates a user's input password against the stored hashed password.
   * @param storedPassword - The stored hashed password.
   * @param inputPassword - The plain text password provided by the user.
   * @returns - True if the passwords match; false otherwise.
   */
  static async validatePassword(storedPassword: string, inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}

export default User;
