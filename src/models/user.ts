import { Model, DataTypes } from 'sequelize';  // Remove Optional import from here
// import { Optional } from 'sequelize'; // Remove this import since it's already in routes

// Define the UserAttributes interface
export interface UserAttributes {
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

// User model definition
export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public firstName?: string;
    public lastName?: string;
    public role!: string;
    public subscriptionStatus!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}
