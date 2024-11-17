// src/models/review.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Ensure the correct import path for sequelize

class Review extends Model {
    public id!: number;
    public serviceId!: number;
    public userId!: number;
    public rating!: number;
    public comment!: string | null;

    // Timestamps for Sequelize
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
    }
);

export default Review;
