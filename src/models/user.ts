import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { sequelize } from '../config/database'; // Import sequelize instance

// Interface defining the attributes of the User model
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: string; // Optional field for user role
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

  // Define the isPaid getter
  get isPaid(): boolean {
    return this.role === 'paid'; // If the role is 'paid', return true
  }
}

// Initialize the User model (no need to manually define `id` here)
User.init(
  {
    username: { type: DataType.STRING, allowNull: false },
    email: { type: DataType.STRING, allowNull: false, unique: true },
    password: { type: DataType.STRING, allowNull: false },
    role: { type: DataType.STRING, allowNull: false, defaultValue: 'free' },
  },
  { sequelize, modelName: 'User' }
);

export default User; // Default export of the User model
