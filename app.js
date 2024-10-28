const { User, initUser } = require('./models/user');
const { Service, initService } = require('./models/services');

// Initialize models
initUser(sequelize);
initService(sequelize);

// Initialize model associations
const initializeModels = () => {
    User.associate({ Service });
    Service.associate({ User });
};
