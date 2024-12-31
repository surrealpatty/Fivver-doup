// src/models/services.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this path is correct
// Define the Service model
export class Service extends Model {
    id; // Change from number to string (UUID)
    title;
    description;
    price;
    userId; // Change userId type to string (UUID)
    image; // Define image as optional
}
Service.init({
    id: {
        type: DataTypes.UUID, // Change to UUID type
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Set default value to auto-generate UUIDs
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
        type: DataTypes.STRING, // userId remains a string (UUID)
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
