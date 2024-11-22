import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../config/database'; // Adjust the import path accordingly

// Define the User interface extending Model
interface UserAttributes {
    id: number;
    email: string;
    password: string;
    username: string;
    isPaid: boolean;
}

// Use Optional to mark fields that are not required when creating a user (id is auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend the Model class to include the User attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public username!: string;
    public isPaid!: boolean;

    // Optionally add virtual methods if needed
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isPaid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users', // Adjust this to your actual table name
        timestamps: true, // Optional, if you want to use createdAt/updatedAt fields
    }
);

export default User;
