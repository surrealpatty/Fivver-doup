"use strict";
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true, // optional
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true, // optional
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Free',
    },
    subscriptionStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Inactive',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set to the current timestamp
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set to the current timestamp
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
//# sourceMappingURL=user.js.map