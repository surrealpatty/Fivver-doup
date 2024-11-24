import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Interface defining the attributes of the Service model
export interface ServiceCreationAttributes {
  userId: number;         // ID of the user associated with the service
  title: string;          // Title of the service
  description: string;    // Description of the service
  price: number;          // Price of the service
}

// Sequelize model for the 'services' table
@Table({ tableName: 'services', timestamps: true })  // Table name 'services' and automatic timestamps
export class Service extends Model<ServiceCreationAttributes> implements ServiceCreationAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;  // Primary key with auto-increment

  @Column({ type: DataType.STRING, allowNull: false })
  public title!: string;  // Title of the service

  @Column({ type: DataType.TEXT, allowNull: false })
  public description!: string;  // Description of the service

  @Column({ type: DataType.FLOAT, allowNull: false })
  public price!: number;  // Price of the service

  @Column({ type: DataType.INTEGER, allowNull: false })
  public userId!: number;  // Foreign key for the user who created the service
}

// Only export the class itself, no need for a separate export of the interface
export default Service;
