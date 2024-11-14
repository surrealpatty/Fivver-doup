"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// userModel.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // assuming sequelize is already configured
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
});
exports.default = User;
//# sourceMappingURL=userModels.js.map