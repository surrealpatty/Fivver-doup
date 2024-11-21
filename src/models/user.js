"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database"); // Ensure correct path to sequelize instance
var uuid_1 = require("uuid"); // Import UUID generation for `id`
var review_1 = require("./review"); // Import the Review model
var order_1 = require("./order"); // Import the Order model
var services_1 = require("./services"); // Import the Service model
// Extend Sequelize's Model with your custom attributes
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Define associations after the model is defined
    User.associate = function (models) {
        // A user can have many reviews
        User.hasMany(models.Review, {
            foreignKey: 'userId',
            as: 'reviews', // Alias for the associated model
        });
        // A user can have many orders
        User.hasMany(models.Order, {
            foreignKey: 'userId',
            as: 'orders', // Alias for the associated model
        });
        // A user can have many services
        User.hasMany(models.Service, {
            foreignKey: 'userId',
            as: 'services', // Alias for the associated model
        });
    };
    return User;
}(sequelize_1.Model));
// Initialize the model
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: uuid_1.v4, // Generate a UUID by default
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isPaid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false, // Default to false if not provided
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'user', // Default to 'user' if not provided
    },
}, {
    sequelize: database_1.sequelize, // Pass the Sequelize instance
    tableName: 'users', // Adjust if your table name differs
    modelName: 'User',
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
});
// Dynamically associate models with the sequelize instance after defining them
User.associate({ Review: review_1.default, Order: order_1.default, Service: services_1.default });
exports.default = User;
