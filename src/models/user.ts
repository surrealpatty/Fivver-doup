import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import Review from './review'; // Import Review model to define the relationship

// Define the User model using Sequelize (with sequelize-typescript)
@Table({ tableName: 'users', timestamps: true })
export default class User extends Model<User, UserCreationAttributes> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public password!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public bio?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public role?: string;

  // Define the association with reviews (one-to-many relationship)
  @HasMany(() => Review)
  public reviews!: Review[];
}

// Define the UserCreationAttributes interface for creating a new user
export interface UserCreationAttributes {
  email: string;
  username: string;
  password: string;
  role?: string;
}

// Define UserInstance type (includes Sequelize instance methods)
export type UserInstance = User;
