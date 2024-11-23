import { Column, DataType, Model, Table } from 'sequelize-typescript';  // Adjust imports for sequelize-typescript

// Define the User model
@Table({ tableName: 'users', timestamps: true })  // Use @Table decorator for the model
class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public username!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public email!: string;

  // Other attributes can be added here in a similar manner...
}

export default User;  // Default export of the User model
