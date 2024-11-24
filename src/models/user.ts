import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @Column({ type: DataType.STRING })
  username!: string;

  @Column({ type: DataType.STRING })
  email!: string;
}
