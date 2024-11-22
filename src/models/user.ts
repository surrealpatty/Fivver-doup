import { DataTypes, Sequelize, Model } from 'sequelize';

// Define User Model using Sequelize's class-based approach
export default (sequelize: Sequelize) => {
    class User extends Model {
        public id!: string;
        public username!: string;
        public email!: string;
        // Add other attributes here

        // Timestamps can be included as per your table definition
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
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true, // If you have timestamps
        }
    );

    return User; // Return the model class
};
