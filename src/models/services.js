import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Correctly import sequelize instance
class Service extends Model {
    id;
    name;
    description;
    user_id;
    createdAt;
    updatedAt;
    static associate(models) {
        Service.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    }
}
Service.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
}, {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    underscored: true,
});
export default Service;
