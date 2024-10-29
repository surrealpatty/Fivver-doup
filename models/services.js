const { Model, DataTypes } = require('sequelize');

class Service extends Model {
    static associate(models) {
        Service.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // You can keep this as 'user' or change it to something more descriptive
        });
    }
}

const initService = (sequelize) => {
    Service.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Use lowercase 'users' to match your database table name
                    key: 'id',
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Title cannot be empty', // Validation for non-empty title
                    },
                    len: {
                        args: [3, 100], // Ensure title length is reasonable
                        msg: 'Title must be between 3 and 100 characters long',
                    },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Description cannot be empty', // Validation for non-empty description
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
                        args: 0,
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

// Exporting both the init function and the Service model
module.exports = {
    init: initService,
    Model: Service, // Changed from Service to Model for consistency
};
