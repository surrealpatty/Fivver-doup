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

// Define associations (to be called in the User model's associate method)
UserProfile.associate = (models) => {
    // Ensure the User model is available before defining associations
    if (models.User) {
        UserProfile.belongsTo(models.User, {
            foreignKey: 'userId', // Specify the foreign key
            as: 'user', // Alias for the association
            onDelete: 'CASCADE', // Delete user profile if the associated user is deleted
        });
    }
};

export default UserProfile;
