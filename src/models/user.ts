import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes for the User model
export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    // Add other attributes if necessary (e.g., password, role, etc.)
}

// Define the creation attributes for the User model
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
    // `id` is optional during creation, since it's auto-generated
}

export default (sequelize: Sequelize) => {
    class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
        public id!: string;
        public username!: string;
        public email!: string;
        // Add other attributes if necessary

        // You can also define instance methods or hooks if required
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,  // Optionally, enforce unique email addresses
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true, // If you have timestamps for createdAt/updatedAt
        }
    );

    return User; // Return the model class
};
