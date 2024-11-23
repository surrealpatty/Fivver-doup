import { Column, DataType, Model, Table } from 'sequelize-typescript';  // Adjust imports for sequelize-typescript

// Define the attributes for the Order model
export interface OrderAttributes {
    id: number;
    userId: number;
    serviceId: number;
    quantity: number;
    totalPrice: number;
    totalAmount: number;
    orderDetails?: string;
    status: string;
}

@Table({ tableName: 'orders', timestamps: true })  // Add the @Table decorator for sequelize-typescript
class Order extends Model<OrderAttributes> implements OrderAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    public id!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    public userId!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    public serviceId!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    public quantity!: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    public totalPrice!: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    public totalAmount!: number;

    @Column({ type: DataType.STRING, allowNull: true })
    public orderDetails?: string;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Pending' })
    public status!: string;
}

export default Order;
