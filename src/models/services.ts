import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // assuming sequelize is correctly configured

export interface ServiceAttributes {
    id: string;
    title: string;
    description: string;
    price: number;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
    public id!: string;
    public title!: string;
    public description!: string;
    public price!: number;
    public userId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Service.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'services',
    }
);

export default Service;  // Ensure default export
