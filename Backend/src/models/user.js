// src/models/user.js
import { Model, DataTypes } from 'sequelize';

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
                validate: {
                    notEmpty: {
                        msg: 'Username cannot be empty',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
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

// Export the User model and the initUser function
export { initUser, User };
