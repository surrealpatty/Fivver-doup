export default User;
declare class User extends Model<any, any> {
    static associate(models: any): void;
    static hashPassword(user: any): Promise<void>;
    constructor(values?: import("sequelize").Optional<any, string> | undefined, options?: import("sequelize").BuildOptions);
}
import { Model } from 'sequelize';
