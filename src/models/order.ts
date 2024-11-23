const { Sequelize, DataTypes, Model } = require('sequelize');  // Correct access to DataTypes via Sequelize

class Order extends Model {
  public id!: number;
  public userId!: string;
  public serviceId!: number;
  public quantity!: number;
  public totalPrice!: number;
  public totalAmount!: number;
  public orderDetails!: string;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
});

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderDetails: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
      allowNull: false,
    },
  },
  {
    sequelize, // Pass sequelize instance
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
  }
);
