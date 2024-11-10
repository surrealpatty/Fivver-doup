import { Model, Optional } from 'sequelize';
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare const initUser: () => Promise<void>;
export default User;
