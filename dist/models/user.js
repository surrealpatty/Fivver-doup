"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Allow null
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Allow null
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
});
//# sourceMappingURL=user.js.map