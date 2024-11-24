import { Model } from 'sequelize-typescript';
export interface ServiceCreationAttributes {
    userId: number;
    description: string;
    price: number;
    title: string;
    category: string;
}
declare class Service extends Model<ServiceCreationAttributes> implements ServiceCreationAttributes {
    id: number;
    userId: number;
    title: string;
    description: string;
    price: number;
    category: string;
}
export default Service;
