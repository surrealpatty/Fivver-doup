import { DataTypes, Sequelize, Model } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Service extends Model {
        public id!: number;
        public userId!: string;
        public title!: string;
        public description!: string;
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
                allowNull: true,
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
