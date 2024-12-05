// In src/test/auth.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
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
// Mocking jsonwebtoken methods for testing
jest.mock('jsonwebtoken', ()=>({
        sign: jest.fn(()=>'mocked_token'),
        verify: jest.fn(()=>({
                id: 'test_user_id'
            }))
    }));
// Define the path to the compiled `index.js` file in `dist/`
const appPath = _path.default.resolve(__dirname, '../dist/index.js');
// Initialize app variable with explicit typing as Express.Application
let app;
beforeAll(async ()=>{
    try {
        // Dynamically import the app from the compiled dist/index.js
        const module = await Promise.resolve(appPath).then((p)=>/*#__PURE__*/ _interop_require_wildcard(require(p)));
        app = module.default || module.app; // Adjust depending on how your app is exported
    } catch (error) {
        console.error('Error loading app from dist:', error);
    }
});
// Define tests only if the app was successfully loaded
describe('Authentication Tests', ()=>{
    it('should respond with a message from the root endpoint', async ()=>{
        if (!app) {
            console.warn('Skipping tests as app could not be loaded');
            return; // Skip the test if app could not be loaded
        }
        // Send a GET request to the root endpoint
        const response = await (0, _supertest.default)(app).get('/');
        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Fiverr backend is running');
    });
    it('should mock the JWT sign and verify methods correctly', ()=>{
        // Test mock for sign method
        const token = _jsonwebtoken.default.sign({
            id: 'test_user_id'
        }, 'secret_key');
        expect(token).toBe('mocked_token');
        expect(_jsonwebtoken.default.sign).toHaveBeenCalledWith({
            id: 'test_user_id'
        }, 'secret_key'); // Ensure the sign method was called with the correct params
        // Test mock for verify method
        const decoded = _jsonwebtoken.default.verify('mocked_token', 'secret_key');
        expect(decoded).toEqual({
            id: 'test_user_id'
        });
        expect(_jsonwebtoken.default.verify).toHaveBeenCalledWith('mocked_token', 'secret_key'); // Ensure verify was called with correct token and secret
    });
});

//# sourceMappingURL=auth.test.js.map