// src/models/services.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this path is correct
// Define the Service model
export class Service extends Model {
    id;
    title;
    description;
    price;
    userId; // Change userId type to string (for UUID)
    image; // Define image as optional
}
Service.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    userId: {
        type: DataTypes.STRING, // Change to STRING to handle UUID as a string
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, // Define 'image' as a string (could be URL or file path)
        allowNull: true, // Allow image to be optional
    },
}, {
    sequelize,
    modelName: 'Service',
});
export default Service;
