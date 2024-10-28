const { Model, DataTypes } = require('sequelize');

class Service extends Model {
    static associate(models) {
        // Define the association with the User model
        Service.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // Alias for the association
        });
    }
}

// Initialize the Service model
const initService = (sequelize) => {
    Service.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Title cannot be empty', // Custom error message
                    },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Description cannot be empty', // Custom error message
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: {
                        args: 0,
                        msg: 'Price cannot be negative', // Custom error message
                    },
                },
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Category cannot be empty', // Custom error message
                    },
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Reference to the User model (table name in lowercase)
                    key: 'id', // Primary key in the referenced model
                },
            },
        },
        {
            sequelize,
            modelName: 'Service',
            tableName: 'services', // Define the table name in your database
            timestamps: true, // Automatically adds createdAt and updatedAt fields
            underscored: true, // Converts camelCase fields to snake_case in the database
        }
    );
};

// Export the Service model and initialization function
module.exports = { Service, initService };
