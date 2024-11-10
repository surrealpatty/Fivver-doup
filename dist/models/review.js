"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.initReview = void 0;
const sequelize_1 = require("sequelize");
class Review extends sequelize_1.Model {
    static associate(models) {
        // Associations with User and Service models
        Review.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
        });
        Review.belongsTo(models.Service, {
            foreignKey: 'serviceId',
            as: 'service',
            onDelete: 'CASCADE',
        });
    }
}
exports.Review = Review;
// Initialize the Review model
const initReview = (sequelize) => {
    Review.init({
        rating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'Rating cannot be null' },
                min: { args: [1], msg: 'Rating must be at least 1' },
                max: { args: [5], msg: 'Rating must be at most 5' },
            },
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Comment cannot be null' },
                len: {
                    args: [1, 500],
                    msg: 'Comment must be between 1 and 500 characters long',
                },
            },
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'User ID cannot be null' },
            },
        },
        serviceId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'Service ID cannot be null' },
            },
        },
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: true,
        underscored: true,
    });
};
exports.initReview = initReview;
//# sourceMappingURL=review.js.map