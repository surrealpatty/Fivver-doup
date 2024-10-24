const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure the path is correct

class Service extends Model {}

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
        references: { // Assuming you have a User model, this adds a foreign key constraint
            model: 'Users',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Service',
});

module.exports = Service;
