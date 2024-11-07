import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Import sequelize instance
import bcrypt from 'bcrypt';  // Import bcrypt for password hashing

class User extends Model {
    // Define associations if any
    static associate(models) {
        // Example association with Review (if you have a relation)
        User.hasMany(models.Review, {
            foreignKey: 'userId',
            as: 'reviews',
            onDelete: 'CASCADE',
        });
    }

    // Password hash before saving user
    static async hashPassword(user) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);  // Hash password before saving
        }
    }
}

// Initialize the User model
User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Ensure the username is unique
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Username must be between 3 and 50 characters long',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // Ensure the email is unique
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
                    args: [6, 100],  // Enforce a minimum password length
                    msg: 'Password must be between 6 and 100 characters long',
                },
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('Free', 'Paid'),  // Define "Free" and "Paid" roles
            allowNull: false,
            defaultValue: 'Free',  // Default to "Free"
        },
    },
    {
        sequelize,             // Ensure sequelize instance is passed here
        modelName: 'User',     // Model name is 'User'
        tableName: 'users',    // Table name in the database
        timestamps: true,      // Automatically create 'createdAt' and 'updatedAt'
        underscored: true,     // Use snake_case in the table column names
    }
);

// Hook to hash password before creating or updating a user
User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);

export default User;  // Export the model directly
