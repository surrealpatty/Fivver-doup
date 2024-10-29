const { Model, DataTypes } = require('sequelize');

class Review extends Model {
    // Associate the Review model with other models
    static associate(models) {
        Review.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // Alias for the User
            onDelete: 'CASCADE',
        });
        Review.belongsTo(models.Service, {
            foreignKey: 'serviceId',
            as: 'service', // Alias for the Service
            onDelete: 'CASCADE',
        });
    }
}

// Initialize the Review model
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
            modelName: 'Review', // This is the name of the model
            tableName: 'reviews', // Ensure this matches your database table name
            timestamps: true, // Enable timestamps if needed
            underscored: true, // Use snake_case for column names
        }
    );
};

// Export the model and the initialization function correctly
module.exports = {
    Review, // Export the Review model class
    initReview, // Export the initialization function
};
