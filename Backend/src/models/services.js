const { Model, DataTypes } = require('sequelize');

class Service extends Model {
    static associate(models) {
        // Define associations here if needed
    }
}

const initService = (sequelize) => {
    Service.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 100],
                        msg: 'Title must be between 3 and 100 characters long',
                    },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Description cannot be empty',
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: 'Price must be a valid number',
                    },
                    min: {
                        args: [0],
                        msg: 'Price must be greater than or equal to zero',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'Service',
            tableName: 'services',
            timestamps: true,
            underscored: true,
        }
    );
};

// src/models/services.js

// Define your model (this is just a placeholder)
export const Model = {
    name: "Service Model",
    description: "This is a service model."
};

// Function to initialize your model
export const init = () => {
    console.log("Service model initialized");
};