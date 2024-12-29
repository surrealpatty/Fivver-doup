import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

// Define the User model with decorators
@Table({ tableName: 'users', timestamps: true }) // Add `timestamps: true` if you use createdAt and updatedAt
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;  // Declare the 'id' explicitly to avoid overwriting base property

  @Column(DataType.STRING)
  username!: string;  // Username field

  @Column(DataType.STRING)
  email!: string;  // Email field

  @Column(DataType.STRING)
  password!: string;  // Password field (store hashed passwords)

  @Column(DataType.STRING)
  tier!: string;  // Tier of the user (e.g., 'Free' or 'Paid')

  @Column(DataType.STRING)
  role!: string;  // Role of the user (e.g., 'Admin', 'User', etc.)

  @Column(DataType.BOOLEAN)
  isVerified!: boolean;  // Verification status of the user (true or false)
}

export default User;
