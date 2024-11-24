import { Column, DataType, Model, Table } from 'sequelize-typescript'; // Import necessary modules for sequelize-typescript
import { Optional } from 'sequelize/types'; // Import Optional type

// Define the User model
@Table({ tableName: 'users' })
class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: 'user' }) // Default role set to 'user'
  role!: string;
}

// Define UserCreation type for creating users (excluding id, createdAt, updatedAt)
export interface UserCreation extends Optional<User, 'id' | 'createdAt' | 'updatedAt'> {}

// Named export for User model
export { User };
