import { Model, Column, DataType, Table } from 'sequelize-typescript';

// Define the Sequelize User model and its creation attributes
@Table({ tableName: 'users', timestamps: true })
class User extends Model<User> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({ type: DataType.STRING, defaultValue: 'free' })
  role!: 'free' | 'paid';  // Role is either 'free' or 'paid'
}

// Export the User model
export { User };

// Separate declaration of UserCreationAttributes inline with the User class
export interface UserCreationAttributes {
  email: string;
  password: string;
  username: string;
  role: 'free' | 'paid';  // Role can either be 'free' or 'paid'
}
