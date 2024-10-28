const { Model, DataTypes } = require('sequelize');

class Service extends Model {
    static associate(models) {
        Service.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // This can remain as 'user'
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
                    model: 'users', // Ensure this matches your table name
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
