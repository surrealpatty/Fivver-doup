// src/models/service.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this import path is correct
class Service extends Model {
    id;
    userId;
    title;
    description;
    price;
    // Timestamps (optional depending on your table setup)
    createdAt;
    updatedAt;
}
Service.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'services',
});
export default Service;
