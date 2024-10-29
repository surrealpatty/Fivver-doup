const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static associate(models) {
        // Define associations here, if any
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Please provide a valid email address',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6],
                        msg: 'Password must be at least 6 characters long',
                    },
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW, // Set default to current timestamp
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW, // Set default to current timestamp
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

module.exports = {
    init: initUser,
    Model: User,
};
