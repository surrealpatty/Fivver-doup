import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Ensure you're using the correct path for the sequelize instance

// Define the UserProfile model
const UserProfile = sequelize.define('UserProfile', {
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Add other fields as necessary
}, {
    tableName: 'user_profiles', // Specify the table name
    timestamps: true, // Add createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names in the database
});

// Define associations
const associate = (models) => {
    UserProfile.belongsTo(models.User, {
        foreignKey: 'userId', // Specify the foreign key
        as: 'user', // Alias for the association
    });
};

// Export the UserProfile model and associate function
export { UserProfile, associate };
