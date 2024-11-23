import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: string; // optional field
}

@Table({ tableName: 'users', timestamps: true }) // Decorator to define the table and timestamp behavior
class User extends Model<UserAttributes> implements UserAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public password!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public role?: string;
}

export default User;  // Default export of the User model
