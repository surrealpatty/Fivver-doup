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
    Order: function() {
        return _order.Order;
    },
    Review: function() {
        return _review.Review;
    },
    Service: function() {
        return _services.default;
    },
    User: function() {
        return _user.User;
    }
});
const _user = require("./user");
const _services = /*#__PURE__*/ _interop_require_default(require("./services"));
const _order = require("./order");
const _review = require("./review");
const _database = require("@config/database");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Define associations
// User can have many services (a user can post many services)
_user.User.hasMany(_services.default, {
    foreignKey: 'userId'
}); // Foreign key will be userId in Service
_services.default.belongsTo(_user.User, {
    foreignKey: 'userId'
}); // A service belongs to one user
// User can have many reviews (a user can leave many reviews)
_user.User.hasMany(_review.Review, {
    foreignKey: 'userId'
}); // Foreign key will be userId in Review
_review.Review.belongsTo(_user.User, {
    foreignKey: 'userId'
}); // A review belongs to one user
// Service can have many reviews (a service can have many reviews)
_services.default.hasMany(_review.Review, {
    foreignKey: 'serviceId'
}); // Foreign key will be serviceId in Review
_review.Review.belongsTo(_services.default, {
    foreignKey: 'serviceId'
}); // A review belongs to one service
// Order belongs to a user and a service (an order is linked to one user and one service)
_order.Order.belongsTo(_user.User, {
    foreignKey: 'userId'
}); // An order belongs to one user
_order.Order.belongsTo(_services.default, {
    foreignKey: 'serviceId'
}); // An order belongs to one service
// Sync models with the database
(async ()=>{
    try {
        await _database.sequelize.sync({
            force: false
        }); // Use { force: false } to avoid overwriting existing data
        console.log('Model associations are successfully set up.');
    } catch (error) {
        console.error('Error setting up model associations:', error);
    }
})();

//# sourceMappingURL=associations.js.map