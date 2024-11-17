import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Correct path to your sequelize instance
import { v4 as uuidv4 } from 'uuid';

class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(), // Automatically generate UUID
            primaryKey: true,
            allowNull: false,
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
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User; // Default export of the User class
