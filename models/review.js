module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Rating cannot be null'
                },
                min: {
                    args: [1],
                    msg: 'Rating must be at least 1'
                },
                max: {
                    args: [5],
                    msg: 'Rating must be at most 5'
                }
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Comment cannot be null'
                },
                len: {
                    args: [1, 500],
                    msg: 'Comment must be between 1 and 500 characters long'
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'User ID cannot be null'
                }
            }
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Service ID cannot be null'
                }
            }
        }
    });

    Review.associate = (models) => {
        // Associate Review with User and Service
        Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
        Review.belongsTo(models.Service, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
    };

    return Review;
};
