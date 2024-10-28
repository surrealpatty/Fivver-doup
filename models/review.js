// models/review.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Review extends Model {}

// Initialize the Review model
Review.init({
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Make sure this matches the name of your User model
            key: 'id',
        },
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Services', // Make sure this matches the name of your Service model
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews', // Specify table name if not pluralized by Sequelize
    timestamps: true, // Enables createdAt and updatedAt fields
});

// Define associations
Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Review.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
};

module.exports = Review;
