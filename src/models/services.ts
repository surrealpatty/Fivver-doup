import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Define the Service model class
@Table({ tableName: 'services' })
class Service extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;
}

export default Service;
