const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static associate(models) {
        // Define association with the Service model
        User.hasMany(models.Service, {
            foreignKey: 'userId',
            as: 'userServices', // Unique alias for better clarity
            onDelete: 'CASCADE', // Define delete behavior
            onUpdate: 'CASCADE', // Define update behavior
        });

        // Define association with the UserProfile model (if applicable)
        User.hasOne(models.UserProfile, {
            foreignKey: 'user_id', // Ensure this matches your UserProfile model's foreign key
            as: 'profile', // Unique alias for better clarity
            onDelete: 'CASCADE', // Define delete behavior
            onUpdate: 'CASCADE', // Define update behavior
        });

        // Add any other associations as needed
    }
}

// Initialization function for the User model
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
                validate: {
                    notEmpty: {
                        msg: 'Username cannot be empty',
                    },
                    len: {
                        args: [3, 30],
                        msg: 'Username must be between 3 and 30 characters long',
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'Email address already in use!',
                },
                validate: {
                    isEmail: {
                        msg: 'Please provide a valid email address',
                    },
                    notEmpty: {
                        msg: 'Email cannot be empty',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 100],
                        msg: 'Password must be at least 6 characters long',
                    },
                    notEmpty: {
                        msg: 'Password cannot be empty',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            underscored: true,
        }
    );
};

// Export an object containing the User model and the init function
module.exports = { User, initUser };
