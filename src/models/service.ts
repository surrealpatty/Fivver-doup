import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes for Service model
export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: string;
}

// Define creation attributes where 'id' is optional
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public userId!: string;  // Assuming userId is a string

  static initModel() {
    Service.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'services',  // Adjust the table name if needed
      }
    );
  }
}

Service.initModel();

export default Service;

