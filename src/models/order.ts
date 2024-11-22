import { DataTypes, Sequelize, Model } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Order extends Model {
        public id!: number;
        public userId!: string;
        public serviceId!: number;
        public status!: string;
    }

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
