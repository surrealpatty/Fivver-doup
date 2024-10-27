const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct

class User extends Model {}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email address already in use!' // Custom error message
            },
            validate: {
                isEmail: { msg: 'Please provide a valid email address' } // Validate email format
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100], // Enforce password length
                    msg: 'Password must be at least 6 characters long'
                }
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users', // Optional: Explicitly set the table name
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Sync the model with the database (optional, consider using migrations)
const syncUserModel = async () => {
    try {
        // You might want to use `force: false` to avoid dropping the table if it already exists
        await sequelize.sync({ force: false }); // Change this to true only in development if you want to recreate the table
        console.log('User model synced with the database.');
    } catch (error) {
        console.error('Error syncing User model:', error.message);
    }
};

// Uncomment the line below to sync the model when this file is run
// syncUserModel();

module.exports = User;
