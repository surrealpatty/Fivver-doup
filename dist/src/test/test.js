"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Describe a basic test suite
describe('Basic Test Suite', ()=>{
    // Test for ensuring the test file runs correctly
    it('should run the test file successfully', ()=>{
        console.log('Test file is running successfully!');
        expect(true).toBe(true); // Simple test to verify the test file is running
    });
    // Test to check if the root endpoint is responding correctly
    it('should respond with a message from the root endpoint', async ()=>{
        const response = await (0, _supertest.default)(_index.app).get('/'); // Send a GET request to the root endpoint
        expect(response.statusCode).toBe(200); // Expect a status code of 200 (OK)
        expect(response.text).toBe('Fiverr backend is running'); // Expect the correct response message
    });
});

//# sourceMappingURL=test.js.map