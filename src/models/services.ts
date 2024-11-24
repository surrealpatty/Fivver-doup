import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'services' })
class Service extends Model<Service> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;

  // Other columns as needed
}

export default Service; // Corrected export statement
