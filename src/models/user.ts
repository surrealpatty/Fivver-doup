import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  // Your User model definition...
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Other fields...
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export default User; // Ensure you're using export default here
