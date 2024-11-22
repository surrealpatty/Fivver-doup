import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Service extends Model {
  // Your Service model definition...
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Other fields...
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true,
  }
);

export default Service; // Ensure you're using export default here
