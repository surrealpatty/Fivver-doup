// src/models/services.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure correct path to database configuration

// Define the attributes for the Service model
export interface ServiceAttributes {
    id: number;
    userId: string;  // Ensure this matches the type of the user ID in your User model
    title: string;
    description?: string;  // description is optional
    price: number;          // Assuming you want a price field
    category: string;       // Assuming you want a category field
}

// Define the creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
    // `id` is optional during creation, since it's auto-incremented
}

// Define the Service model
export default (sequelize: Sequelize) => {
    class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
        public id!: number;
        public userId!: string;  // Assuming UUID for userId
        public title!: string;
        public description?: string;
        public price!: number;
        public category!: string;

        // Add any additional instance methods or hooks here if necessary
    }

    // Initialize the model
    Service.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,  // Ensure this is UUID, assuming you're using UUID for User IDs
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,  // description is optional, so allow null
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize, // Ensure Sequelize instance is passed
            modelName: 'Service',
            tableName: 'services',
            timestamps: true, // Automatically add createdAt and updatedAt columns
        }
    );

    return Service;
};
