import { Table, Column, Model, DataType } from 'sequelize-typescript';

// Define the User model using Sequelize
@Table
export default class User extends Model<UserInstance> {
  @Column({ type: DataType.STRING })
  username!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.STRING })
  password!: string; // Add password column

  @Column({ type: DataType.STRING })
  role?: string; // Add role column
}

// Define the UserAttributes interface for type checking (attributes passed to create method)
export interface UserAttributes {
  id?: number; // Optional for create, as Sequelize will auto-generate it
  username: string;
  email: string;
  password: string; // Include password field here
  role?: string;
}

// Define the UserInstance type (includes Sequelize instance methods)
export type UserInstance = User;
