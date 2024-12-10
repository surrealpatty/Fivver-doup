"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "User", {
    enumerable: true,
    get: function() {
        return User;
    }
});
const _sequelize = require("sequelize");
const _database = require("../config/database");
class User extends _sequelize.Model {
    id;
    email;
    username;
    password;
    role;
    tier;
    isVerified;
}
User.init({
    id: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free'
    },
    tier: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free'
    },
    isVerified: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: _database.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});

//# sourceMappingURL=user.js.map