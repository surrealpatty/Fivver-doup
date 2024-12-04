// src/test/setup.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
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
// Load environment variables from .env file
_dotenv.default.config(); // Ensure the environment variables are loaded before any tests run
// Mocking modules and models for testing
// Mock User model methods
jest.mock('../models/user', ()=>({
        findOne: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn()
    }));
// Mock Order model methods
jest.mock('../models/order', ()=>({
        findByPk: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        destroy: jest.fn()
    }));
// Mock JWT methods
jest.mock('jsonwebtoken', ()=>({
        verify: jest.fn(),
        sign: jest.fn(()=>'mockedToken')
    }));
// Mock Sequelize connection
jest.mock('../config/database', ()=>({
        sequelize: {
            authenticate: jest.fn().mockResolvedValue(undefined),
            close: jest.fn().mockResolvedValue(undefined)
        }
    }));
/**
 * Global setup for environment variables or mock configurations.
 */ beforeAll(()=>{
    // Set up mock environment variables
    process.env.JWT_SECRET = 'mock-secret-key'; // Mock JWT secret key for testing
    // Other environment variables can be set here if needed
    console.log('Setting up before all tests...');
});
/**
 * Reset mocks to ensure no state leaks between tests.
 */ afterEach(()=>{
    jest.clearAllMocks(); // Clears all mock calls and resets mock states after each test
});
/**
 * Clean-up tasks after all tests have run.
 */ afterAll(async ()=>{
    console.log('Cleaning up after all tests...');
    await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("../config/database"))).then(async (module)=>{
        await module.sequelize.close(); // Close the mocked DB connection
    });
});

//# sourceMappingURL=setup.js.map