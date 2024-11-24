import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Define the attributes of the Service model
export interface ServiceAttributes {
  id?: number; // Optional ID for creation scenarios
  title: string;
  description: string;
  price: number;
  userId: number;  // Foreign key for the User
}

// Sequelize model for the 'services' table
@Table({ tableName: 'services', timestamps: true })
export class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public description!: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  public price!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public userId!: number;
}
