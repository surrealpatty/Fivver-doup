// src/models/user.js
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static associate(models) {
        // Define associations here if needed
    }
}

const initUser = (sequelize) => {
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        args: [3, 30],
                        msg: 'Username must be between 3 and 30 characters long',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: 'Must be a valid email address',
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

// Export the User model and the initUser function
module.exports = { initUser, Model: User }; // Ensure 'Model' is exported correctly
