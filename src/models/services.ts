import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes for the Service model
export interface ServiceAttributes {
    id: number;
    userId: string;  // Ensure this matches the type of the user ID in your User model
    title: string;
    description?: string;  // description is optional
}

// Define the creation attributes for the Service model
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
    // `id` is optional during creation, since it's auto-incremented
}

export default (sequelize: Sequelize) => {
    class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
        public id!: number;
        public userId!: string;  // Assuming UUID for userId
        public title!: string;
        public description?: string;

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
