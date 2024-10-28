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
                    model: 'Users', // Use the model name with an uppercase first letter for consistency
                    key: 'id',
                },
            },
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

module.exports = { Service, initService };
