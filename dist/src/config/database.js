"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sequelize", {
    enumerable: true,
    get: function() {
        return sequelize;
    }
});
const _sequelize = require("sequelize");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Sequelize connection configuration
const sequelize = new _sequelize.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    },
    logging: false
});
// Authenticate the Sequelize connection to ensure it works
sequelize.authenticate().then(()=>{
    console.log('Database connected successfully!');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
});
 // Named export

//# sourceMappingURL=database.js.map