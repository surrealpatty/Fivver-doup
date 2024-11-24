import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // assuming sequelize is correctly configured

export interface ReviewAttributes {
    id: string;
    serviceId: string;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    public id!: string;
    public serviceId!: string;
    public rating!: number;
    public comment!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Review.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        serviceId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'reviews',
    }
);

export default Review;  // Ensure default export
