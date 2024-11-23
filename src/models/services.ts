import { Column, DataType, Model, Table } from 'sequelize-typescript';  // Adjust imports for sequelize-typescript

// Define the Service model
@Table({ tableName: 'services', timestamps: true })  // Add the @Table decorator
class Service extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public userId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public description!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  public price!: number;
}

export default Service;
