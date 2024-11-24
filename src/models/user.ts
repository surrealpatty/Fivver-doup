// src/models/user.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Define the interface for the User's attributes
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: string; // Role is optional
}

// Define the User model class, which will implement the UserAttributes interface
@Table({ tableName: 'users' })
class User extends Model<UserAttributes> implements UserAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string; // Ensure that 'password' field is included in the model

  @Column({ type: DataType.STRING, allowNull: true })
  role!: string; // Ensure that 'role' field is included in the model

  // You can add other fields here as needed
}

export default User;
