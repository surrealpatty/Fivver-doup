import { Column, DataType, Model, Table } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

// Interface defining the attributes of the User model
export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: string;
  bio?: string;
}

@Table({ tableName: 'users', timestamps: true })
class User extends Model<UserAttributes> implements UserAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public password!: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'free' })
  public role!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public bio?: string;

  get isPaid(): boolean {
    return this.role === 'paid';
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

export default User;

