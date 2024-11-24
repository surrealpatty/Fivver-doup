import { Model } from 'sequelize-typescript';
export interface OrderAttributes {
    id?: number;
    userId: number;
    serviceId: number;
    quantity: number;
    totalPrice: number;
    totalAmount: number;
    orderDetails?: string;
    status: string;
}
declare class Order extends Model<OrderAttributes> implements OrderAttributes {
    id: number;
    userId: number;
    serviceId: number;
    quantity: number;
    totalPrice: number;
    totalAmount: number;
    orderDetails?: string;
    status: string;
}
export default Order;
