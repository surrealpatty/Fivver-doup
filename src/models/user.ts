import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;
}

export default User;
