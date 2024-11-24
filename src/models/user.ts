import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @Column({ type: DataType.STRING })
  username!: string;

  @Column({ type: DataType.STRING })
  email!: string;
}

// Optionally, export the model's attributes type
export type UserAttributes = {
  username: string;
  email: string;
};

// Optionally, export the instance type (which includes additional Sequelize methods)
export type UserInstance = User;
