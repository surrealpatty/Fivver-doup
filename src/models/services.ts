import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import Review from './review'; // Import the Review model to define the relationship

// Interface defining the attributes of the Service model
export interface ServiceAttributes {
  id: number;            // ID of the service
  userId: number;        // ID of the user associated with the service
  title: string;         // Title of the service
  description: string;   // Description of the service
  price: number;         // Price of the service
}

// Interface defining the attributes required for creating a Service
export interface ServiceCreationAttributes {
  userId: number;         // ID of the user associated with the service
  title: string;          // Title of the service
  description: string;    // Description of the service
  price: number;          // Price of the service
}

// Sequelize model for the 'services' table
@Table({ tableName: 'services', timestamps: true })  // Table name 'services' and automatic timestamps
export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
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

  // Define the association with reviews (one-to-many relationship)
  @HasMany(() => Review)
  public reviews!: Review[];
}

// Export the Service model class
export default Service;
