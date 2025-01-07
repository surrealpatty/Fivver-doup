"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    User: function() {
        return User;
    },
    UserRole: function() {
        return _UserRoles.UserRole;
    },
    UserTier: function() {
        return _UserRoles.UserTier;
    }
});
const _sequelize = require("sequelize");
const _database = require("../config/database");
const _UserRoles = require("../types/UserRoles");
const _uuid = require("uuid");
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
    createdAt;
    updatedAt;
    // Define the model with validation and default values
    static initModel() {
        User.init({
            id: {
                type: _sequelize.DataTypes.UUID,
                defaultValue: _uuid.v4,
                primaryKey: true,
                allowNull: false
            },
            email: {
                type: _sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            username: {
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
                allowNull: false,
                defaultValue: _UserRoles.UserRole.User,
                validate: {
                    isIn: [
                        [
                            'user',
                            'admin'
                        ]
                    ]
                }
            },
            tier: {
                type: _sequelize.DataTypes.ENUM('free', 'paid'),
                allowNull: false,
                defaultValue: _UserRoles.UserTier.Free,
                validate: {
                    isIn: [
                        [
                            'free',
                            'paid'
                        ]
                    ]
                }
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
    }
}
// Initialize the model
User.initModel();
