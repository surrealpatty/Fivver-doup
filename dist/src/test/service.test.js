// src/test/server.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let server;
beforeAll(()=>{
    // Start the server before any tests
    server = _index.default.listen(3001, ()=>{
        console.log('Test server is running on port 3001');
    });
});
afterAll(async ()=>{
    // Close the server after all tests to release the port
    await server.close(()=>{
        console.log('Test server closed.');
    });
});
describe('GET /', ()=>{
    it('should respond with 200', async ()=>{
        const response = await (0, _supertest.default)(_index.default).get('/');
        expect(response.status).toBe(200);
    });
});

//# sourceMappingURL=service.test.js.map