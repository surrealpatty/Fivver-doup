// src/models/user.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/database'; // Ensure correct import path

// Interface defining the attributes of the User model
export interface UserAttributes {
  id?: number; // Optional 'id' for creation scenarios
  username: string;
  email: string;
  password: string;
  role?: string; // Optional role with a default value
  bio?: string; // Optional bio field
}

// Sequelize model for the 'users' table
@Table({ tableName: 'users', timestamps: true }) // Automatically includes createdAt and updatedAt fields
class User extends Model<UserAttributes> implements UserAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number; // Primary key with auto-increment

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public email!: string; // Unique and required email field

  @Column({ type: DataType.STRING, allowNull: false })
  public username!: string; // Required username field

  @Column({ type: DataType.STRING, allowNull: false })
  public password!: string; // Required password field

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'free' })
  public role!: string; // Role field (default 'free')

  @Column({ type: DataType.STRING, allowNull: true })
  public bio?: string; // Optional bio field

  // Define the `isPaid` getter to determine if the user is a paid user
  get isPaid(): boolean {
    return this.role === 'paid';
  }

  // Method to check if the provided password matches the stored password (hashed)
  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password); // assuming password is hashed
  }
}

// Ensure the model is added to sequelize for synchronization
sequelize.addModels([User]); // Add the User model to Sequelize instance

// Export the User model as the default export
export default User;
