import { Model, DataTypes } from 'sequelize';

class User extends Model {
    static associate(models) {
        // Define associations here if needed
        // Example: User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
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
                validate: {
                    len: {
                        args: [8, 100],
                        msg: 'Password must be at least 8 characters long',
                    },
                    is: {
                        args: /(?=.*[0-9])(?=.*[!@#$%^&*])/,
                        msg: 'Password must contain at least one number and one special character',
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: 'Email must be a valid email address',
                    },
                },
            },
            // Add other fields as needed
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
export { User, initUser };
