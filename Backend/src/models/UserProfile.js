import { Model, DataTypes } from 'sequelize';

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
                    model: 'users', // Ensure this matches the actual table name
                    key: 'id',
                },
                unique: true, // Ensure one profile per user
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 50], // Ensure name is between 3 and 50 characters long
                        msg: 'Name must be between 3 and 50 characters long.',
                    },
                },
            },
            profilePicture: {
                type: DataTypes.STRING, // Store the image URL
                allowNull: true,
            },
            skills: {
                type: DataTypes.JSON, // Store an array of skills
                allowNull: true,
            },
            services: {
                type: DataTypes.JSON, // Store an array of services
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
            sequelize, // Pass sequelize instance
            modelName: 'UserProfile',
            tableName: 'user_profiles', // Specify the table name
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            underscored: true, // Uses snake_case in the database
        }
    );
};

// Export the init function and the UserProfile model correctly
export { initUserProfile, UserProfile }; // Use ES6 export syntax
