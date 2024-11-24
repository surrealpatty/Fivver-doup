import { Model } from 'sequelize-typescript';
export interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    role?: string;
    bio?: string;
}
declare class User extends Model<UserAttributes> implements UserAttributes {
    id: number;
    email: string;
    username: string;
    password: string;
    role: string;
    bio?: string;
    get isPaid(): boolean;
    checkPassword(password: string): boolean;
}
export default User;
