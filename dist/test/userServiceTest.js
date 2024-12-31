import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Assuming sequelize is properly initialized
class Service extends Model {
    id;
    userId;
    name;
    description;
    price;
    image; // Add image property to your model
}
Service.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING }, // Make sure this matches your DB schema
}, {
    sequelize,
    modelName: 'Service',
});
export default Service;
//# sourceMappingURL=userServiceTest.js.map