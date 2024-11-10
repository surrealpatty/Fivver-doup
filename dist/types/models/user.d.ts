import { Model } from 'sequelize';
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: string;
    subscriptionStatus: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class User extends Model<UserAttributes> implements UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: string;
    subscriptionStatus: string;
    createdAt: Date;
    updatedAt: Date;
}
export default User;
