const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database config
const User = require('./user'); // Import the User model to set up the association

// Define the UserProfile model
class UserProfile extends Model {
    static associate(models) {
        UserProfile.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // Use an alias for better readability
            onDelete: 'CASCADE', // Enable cascading delete
        });
    }
}

// Initialize the UserProfile model
const initUserProfile = (sequelize) => {
    UserProfile.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User, // Reference the User model directly
                    key: 'id',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profilePicture: {
                type: DataTypes.STRING, // Store the image URL
                allowNull: true,
            },
            skills: {
                type: DataTypes.TEXT, // For a comma-separated list or JSON string
                allowNull: true,
            },
            services: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            experience: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            isPaid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false, // Flag for paid profiles
            },
        },
        {
            sequelize,
            modelName: 'UserProfile',
            tableName: 'user_profiles', // Specify the table name
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            underscored: true, // Uses snake_case in the database
        }
    );
};

// Export the UserProfile model and the init function
module.exports = { UserProfile, initUserProfile };
