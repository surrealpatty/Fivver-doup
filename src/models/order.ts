import { DataTypes, Sequelize, Model } from 'sequelize';

// Define the Order model class
class Order extends Model {
    public id!: number;
    public userId!: string;
    public serviceId!: number;
    public status!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    // Initialize the Order model
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
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            timestamps: true,
        }
    );

    return Order;
};
