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
const _types = require("../types");
const _services = require("./services");
class User extends _sequelize.Model {
    id;
    email;
    username;
    password;
    role;
    tier;
    isVerified;
    passwordResetToken;
    passwordResetTokenExpiry;
    // Define the relationship with the Service model
    static associate() {
        this.hasMany(_services.Service, {
            foreignKey: 'userId',
            as: 'services'
        });
    }
}
User.init({
    id: {
        type: _sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: _sequelize.DataTypes.UUIDV4
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
    username: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    tier: {
        type: _sequelize.DataTypes.ENUM,
        values: Object.values(_types.UserTier),
        defaultValue: _types.UserTier.Free
    },
    role: {
        type: _sequelize.DataTypes.ENUM,
        values: Object.values(_types.UserRole),
        defaultValue: _types.UserRole.User
    },
    isVerified: {
        type: _sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    },
    passwordResetToken: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
    },
    passwordResetTokenExpiry: {
        type: _sequelize.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: _database.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});
// Initialize associations
User.associate();
