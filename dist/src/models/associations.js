// src/models/associations.ts
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
        return _order.default;
    },
    Review: function() {
        return _review.Review;
    },
    Service: function() {
        return _services.Service;
    },
    User: function() {
        return _user.default;
    }
});
const _database = require("../config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("./user"));
const _services = require("./services");
const _order = /*#__PURE__*/ _interop_require_default(require("./order"));
const _review = require("./review");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Register models with Sequelize
_database.sequelize.addModels([
    _user.default,
    _services.Service,
    _order.default,
    _review.Review
]);
// User can have many services (a user can post many services)
_user.default.hasMany(_services.Service, {
    foreignKey: 'userId'
}); // Foreign key in Service will be userId
_services.Service.belongsTo(_user.default, {
    foreignKey: 'userId'
}); // A service belongs to one user
// User can have many reviews (a user can leave many reviews)
_user.default.hasMany(_review.Review, {
    foreignKey: 'userId'
}); // Foreign key in Review will be userId
_review.Review.belongsTo(_user.default, {
    foreignKey: 'userId'
}); // A review belongs to one user
// Service can have many reviews (a service can have many reviews)
_services.Service.hasMany(_review.Review, {
    foreignKey: 'serviceId'
}); // Foreign key in Review will be serviceId
_review.Review.belongsTo(_services.Service, {
    foreignKey: 'serviceId'
}); // A review belongs to one service
// Order belongs to a user and a service (an order is linked to one user and one service)
_order.default.belongsTo(_user.default, {
    foreignKey: 'userId'
}); // An order belongs to one user
_order.default.belongsTo(_services.Service, {
    foreignKey: 'serviceId'
}); // An order belongs to one service
// Optionally, you can sync models here if needed (but this should typically be done in a separate initialization file)
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