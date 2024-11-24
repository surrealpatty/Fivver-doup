// src/models/user.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({ type: DataType.STRING, allowNull: true })
  role!: string;
}

export default User;  // Default export for User model
