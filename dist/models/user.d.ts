import { Model, Optional } from 'sequelize';
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: 'Free' | 'Paid';
    subscriptionStatus: 'Inactive' | 'Active';
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: 'Free' | 'Paid';
    subscriptionStatus: 'Inactive' | 'Active';
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    static associate(models: any): void;
    static hashPassword(user: User): Promise<void>;
}
export default User;
