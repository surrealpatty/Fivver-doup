const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static associate(models) {
        // Define one-to-many association with Service
        User.hasMany(models.Service, {
            foreignKey: 'userId',
            as: 'services', // Alias for the services association
        });

        // Define one-to-one association with UserProfile
        User.hasOne(models.UserProfile, {
            foreignKey: 'userId',
            as: 'userProfile',
            onDelete: 'CASCADE', // Enable cascading delete for related user profile
        });
    }
}

// Initialize the User model
const initUser = (sequelize) => {
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
                unique: {
                    args: true,
                    msg: 'Username already taken', // Custom error message for unique constraint
                },
                validate: {
                    notEmpty: {
                        msg: 'Username cannot be empty', // Validate that username is not empty
                    },
                    len: {
                        args: [3, 30], // Enforce username length
                        msg: 'Username must be between 3 and 30 characters long',
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'Email address already in use!', // Custom error message for unique constraint
                },
                validate: {
                    isEmail: {
                        msg: 'Please provide a valid email address', // Validate email format
                    },
                    notEmpty: {
                        msg: 'Email cannot be empty', // Validate that email is not empty
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 100], // Enforce password length
                        msg: 'Password must be at least 6 characters long',
                    },
                    notEmpty: {
                        msg: 'Password cannot be empty', // Validate that password is not empty
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users', // Explicitly set the table name
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            underscored: true, // Use snake_case for columns in the database
        }
    );
};

// Export the initialization function separately to avoid circular dependency issues
module.exports = { User, initUser };
