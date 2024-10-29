const { Model, DataTypes } = require('sequelize');

class Review extends Model {
    static associate(models) {
        Review.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // Optional: You can give it an alias
            onDelete: 'CASCADE',
        });
        Review.belongsTo(models.Service, {
            foreignKey: 'serviceId',
            as: 'service', // Optional: You can give it an alias
            onDelete: 'CASCADE',
        });
    }
}

const initReview = (sequelize) => {
    Review.init(
        {
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Rating cannot be null',
                    },
                    min: {
                        args: [1],
                        msg: 'Rating must be at least 1',
                    },
                    max: {
                        args: [5],
                        msg: 'Rating must be at most 5',
                    },
                },
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Comment cannot be null',
                    },
                    len: {
                        args: [1, 500],
                        msg: 'Comment must be between 1 and 500 characters long',
                    },
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'User ID cannot be null',
                    },
                },
            },
            serviceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Service ID cannot be null',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'Review',
            tableName: 'reviews', // Ensure this matches your database table name
            timestamps: true, // Enable timestamps if needed
            underscored: true, // Enable underscored column names if needed
        }
    );
};

// Export the model and the initialization function
module.exports = { Review, initReview };
