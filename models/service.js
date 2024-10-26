const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure the path is correct

class Service extends Model {}

// Initialize the Service model
Service.init({
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
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Make sure this matches your actual user table name
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Service',
    tableName: 'services', // This will define the table name in your database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// If you're using associations (e.g., defining relationships between models), do that here
Service.associate = (models) => {
    Service.belongsTo(models.User, {
        foreignKey: 'userId', // This should match the foreign key in the Service model
        as: 'user', // This alias can be used when fetching related data
    });
};

module.exports = Service; // Ensure this line is present
