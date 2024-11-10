import { Model, Optional } from 'sequelize';
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
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
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    subscriptionStatus: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const initUser: () => Promise<void>;
export default User;
