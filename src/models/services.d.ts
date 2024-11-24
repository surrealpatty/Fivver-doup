import { Model } from 'sequelize-typescript';
declare class Service extends Model<Service> {
    id: number;
    name: string;
    price: number;
}
export default Service;
