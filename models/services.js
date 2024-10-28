const { Model, DataTypes } = require('sequelize');

class Service extends Model {
    static associate(models) {
        // Define the association with the User model
        Service.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
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
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: 0, // Ensure price cannot be negative
                },
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Reference to the User model (table name in lowercase)
                    key: 'id',
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
