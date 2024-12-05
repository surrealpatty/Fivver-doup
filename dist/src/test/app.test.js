"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _database = require("../config/database");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// Define the path to the compiled `index.js` file in `dist/`
const appPath = _path.default.resolve(__dirname, '../../dist/index'); // Adjusted path
// Initialize app variable with explicit typing as Express.Application
let app;
beforeAll(async ()=>{
    // First, ensure Sequelize sync is complete
    await _database.sequelize.sync(); // This will sync models with the database
    try {
        // Dynamically import the app from the compiled dist/index.js
        const module = await Promise.resolve(appPath).then((p)=>/*#__PURE__*/ _interop_require_wildcard(require(p)));
        app = module.default || module.app; // Adjust based on how your app is exported
    } catch (error) {
        console.error('Error loading app from dist:', error);
        throw error; // Ensure the tests fail if the app can't be loaded
    }
});
afterAll(async ()=>{
    // Close the database connection after tests have finished
    await _database.sequelize.close();
});
describe('Basic Test Suite', ()=>{
    it('should respond with a message from the root endpoint', async ()=>{
        if (!app) {
            console.warn('Skipping tests as app could not be loaded');
            return; // Skip the test if app could not be loaded
        }
        // Send a GET request to the root endpoint
        const response = await (0, _supertest.default)(app).get('/');
        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to Fiverr Clone!');
    });
// Add more tests as needed
});

//# sourceMappingURL=app.test.js.map