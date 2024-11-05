import { Model, DataTypes } from 'sequelize';

class Service extends Model {
    static associate(models) {
        // Define associations here if needed
        // Example: Service.hasMany(models.Review, { foreignKey: 'serviceId', as: 'reviews' });
    }
}

// Function to initialize the Service model
const initService = (sequelize) => {
    Service.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 100],
                        msg: 'Title must be between 3 and 100 characters long',
                    },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Description cannot be empty',
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: 'Price must be a valid number',
                    },
                    min: {
                        args: [0],
                        msg: 'Price must be greater than or equal to zero',
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'Service',
            tableName: 'services',
            timestamps: true,
            underscored: true,
        }
    );
};

// Export the Service model and the initService function
export { Service, initService };
