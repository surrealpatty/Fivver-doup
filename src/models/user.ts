import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: string;
  bio?: string;
}

@Table({ tableName: 'users', timestamps: true })
export default class User extends Model<UserAttributes> implements UserAttributes {
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
}
