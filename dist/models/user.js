"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Adjust path if necessary
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Free', // Default role
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Inactive', // Default subscription status
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW, // Automatically handle createdAt
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users', // The table name
    timestamps: false, // Disabling Sequelize's default createdAt/updatedAt columns
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBdUQ7QUFDdkQsaURBQStDLENBQUMsMkJBQTJCO0FBaUIzRSxNQUFNLElBQUssU0FBUSxpQkFBNkM7Q0FVL0Q7QUFvRFEsb0JBQUk7QUFsRGIsSUFBSSxDQUFDLElBQUksQ0FDUDtJQUNFLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87UUFDdkIsVUFBVSxFQUFFLElBQUk7UUFDaEIsYUFBYSxFQUFFLElBQUk7S0FDcEI7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDakI7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLE1BQU0sRUFBRSxlQUFlO0tBQ3RDO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDbEIsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsVUFBVSxFQUFFLDhCQUE4QjtLQUN6RDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxxQkFBUyxDQUFDLElBQUk7UUFDcEIsWUFBWSxFQUFFLHFCQUFTLENBQUMsR0FBRyxFQUFFLGlDQUFpQztLQUMvRDtDQUNGLEVBQ0Q7SUFDRSxTQUFTLEVBQVQsb0JBQVM7SUFDVCxTQUFTLEVBQUUsTUFBTTtJQUNqQixTQUFTLEVBQUUsT0FBTyxFQUFFLGlCQUFpQjtJQUNyQyxVQUFVLEVBQUUsS0FBSyxFQUFFLDREQUE0RDtDQUNoRixDQUNGLENBQUMifQ==