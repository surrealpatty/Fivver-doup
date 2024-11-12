import { Model, Optional } from 'sequelize';
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
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt'> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    subscriptionStatus: string;
    createdAt: Date;
}
export { User, UserAttributes, UserCreationAttributes };
