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
            onDelete: 'CASCADE', // Enable cascading delete
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
                    msg: 'Username already taken',
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'Email address already in use!', // Custom error message
                },
                validate: {
                    isEmail: {
                        msg: 'Please provide a valid email address', // Validate email format
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
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users', // Explicitly set the table name
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            underscored: true, // Uses snake_case in the database
        }
    );
};

// Export the User model and initialization function
module.exports = { User, initUser };
