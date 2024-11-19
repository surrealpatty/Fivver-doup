import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Review from './review';  // Corrected import

class Service extends Model {
  public id!: number;
  public userId!: string;
  public title!: string;
  public description!: string;
  public price!: number;

  // Define associations in the associate method
  public static associate(models: any) {
    Service.hasMany(models.Review, { foreignKey: 'serviceId' });  // One-to-many relation
  }
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
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
    underscored: true,
  }
);

export default Service;
