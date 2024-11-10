export default Service;
declare class Service extends Model<any, any> {
    static associate(models: any): void;
    constructor(values?: import("sequelize").Optional<any, string> | undefined, options?: import("sequelize").BuildOptions);
}
import { Model } from 'sequelize';
