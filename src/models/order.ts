import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';  // Ensure this is correctly imported
import  Service  from './services';
const service = await Service.findByPk(id);
// Define the model attributes interface for TypeScript
export interface OrderAttributes {
  id: number;
  userId: string | null;  // UUID type for userId
  serviceId: number | null;  // INTEGER for serviceId
  orderDetails: string;
  quantity: number;  // Add quantity to attributes
  totalAmount: number; // Add totalAmount to attributes
  status: 'Pending' | 'Completed' | 'Cancelled'; // Use ENUM for status
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// Define the creation attributes interface (excluding `id`)
export type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: string | null;  // UUID for userId
  public serviceId!: number | null;  // INTEGER for serviceId
  public orderDetails!: string;
  public quantity!: number;  // Add quantity field
  public totalAmount!: number; // Add totalAmount field
  public status!: 'Pending' | 'Completed' | 'Cancelled'; // Type-safe status
  public readonly createdAt!: Date | null;  // Make it readonly, Sequelize will handle it
  public readonly updatedAt!: Date | null;  // Make it readonly, Sequelize will handle it

  // Define associations inside the `associate` method
  static associate(models: { User: typeof User; Service: typeof Service }) {
    // Each Order belongs to a User (foreign key `userId`)
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Each Order belongs to a Service (foreign key `serviceId`)
    Order.belongsTo(Service, { foreignKey: 'serviceId' });
    Order.belongsTo(Service, {
      as: 'service',  // Correct usage of 'as' in the association definition
      foreignKey: 'serviceId',
    });
  }
}

// Initialize the Order model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // Auto increment the id
    },
    userId: {
      type: DataTypes.UUID,  // Use UUID for userId
      allowNull: true,  // Allow null for ON DELETE SET NULL behavior
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    serviceId: {
      type: DataTypes.INTEGER,  // INTEGER for serviceId, since Service uses INTEGER ID
      allowNull: true,  // Allow null for ON DELETE SET NULL behavior
      references: {
        model: Service,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    orderDetails: {
      type: DataTypes.STRING,  // Adjust type based on your needs
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,  // INTEGER for quantity
      allowNull: false,  // Ensure quantity is required
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),  // DECIMAL for totalAmount (with precision and scale)
      allowNull: false,  // Ensure totalAmount is required
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),  // Use ENUM for status
      allowNull: false,
      defaultValue: 'Pending', // Default status to 'Pending'
    },
  },
  {
    sequelize,  // Reference the sequelize instance
    modelName: 'Order',
    tableName: 'orders',  // Ensure it matches the table name
    timestamps: true,  // Sequelize will automatically handle `createdAt` and `updatedAt`
    underscored: true,  // Use snake_case for column names (e.g., `created_at`)
  }
);

export default Order;
