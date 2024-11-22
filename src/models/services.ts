import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes for Service creation
export interface ServiceAttributes {
    id: number;
    userId: string;
    title: string;
    description?: string;  // Optional description
    price: number;  // Add price to the attributes
}

// Define the creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
    // `id` is optional during creation, since it's auto-incremented
}

export default (sequelize: Sequelize) => {
    class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
        public id!: number;
        public userId!: string;
        public title!: string;
        public description?: string;
        public price!: number;  // Define price as part of the Service model

        // Define any additional instance methods or hooks here if necessary
    }

    Service.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true, // Since description is optional
            },
            price: {
                type: DataTypes.DECIMAL,  // Price should be a number
                allowNull: false,  // Price is required
            },
        },
        {
            sequelize,
            modelName: 'Service',
            tableName: 'services',
            timestamps: true,
        }
    );

    return Service;
};
