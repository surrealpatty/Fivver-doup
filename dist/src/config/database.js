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
    sequelize: function() {
        return sequelize;
    },
    testConnection: function() {
        return testConnection;
    }
});
const _sequelizetypescript = require("sequelize-typescript");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _user = require("@models/user");
const _services = /*#__PURE__*/ _interop_require_default(require("@models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// TypeScript type guard to ensure environment variables are set
const checkEnvVars = ()=>{
    const requiredVars = [
        'DB_NAME',
        'DB_USER',
        'DB_PASSWORD',
        'DB_HOST'
    ];
    const missingVars = requiredVars.filter((varName)=>!process.env[varName]);
    if (missingVars.length > 0) {
        console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
        return false;
    }
    return true;
};
// Ensure environment variables are available
if (!checkEnvVars()) {
    process.exit(1); // Exit if environment variables are missing
}
// Initialize Sequelize instance with database connection details
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [
        _user.User,
        _services.default
    ],
    dialectOptions: {
        authPlugins: {
            mysql_native_password: ()=>{}
        }
    },
    logging: false
});
// Test database connection
const testConnection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Database connection successful');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
        return false;
    }
};

//# sourceMappingURL=database.js.map