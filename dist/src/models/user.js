// src/models/user.ts
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
    username;
    email;
    password;
    role;
    tier;
    isVerified;
}
// Initialize the User model with the sequelize instance
User.init({
    id: {
        type: _sequelize.DataTypes.UUID,
        defaultValue: _sequelize.DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    tier: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    isVerified: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: _database.sequelize,
    modelName: 'User'
});

//# sourceMappingURL=user.js.map