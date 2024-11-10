export default User;
declare class User extends Model<UserAttributes, UserCreationAttributes> {
    static associate(models: any): void;
    static hashPassword(user: User): Promise<void>;
    constructor(values?: Optional<UserCreationAttributes, import("sequelize/types/utils").NullishPropertiesOf<UserCreationAttributes>> | undefined, options?: import("sequelize").BuildOptions);
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: "Free" | "Paid";
    subscriptionStatus: "Inactive" | "Active";
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: "Free" | "Paid";
    subscriptionStatus: "Inactive" | "Active";
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
interface UserCreationAttributes extends  {
}
import { Model } from 'sequelize';
import { Optional } from 'sequelize';
