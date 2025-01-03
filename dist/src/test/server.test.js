// src/test/server.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _http = /*#__PURE__*/ _interop_require_default(require("http"));
const _index = require("../index");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('Server Tests', ()=>{
    let server;
    beforeAll(()=>{
        // Create and start the server before tests
        server = _http.default.createServer(_index.app);
        server.listen(3000); // Start the server
    });
    it('should respond to a GET request', async ()=>{
        const res = await (0, _supertest.default)(_index.app).get('/some-route');
        expect(res.status).toBe(200);
    });
    afterAll(async ()=>{
        // Close the server after tests
        await new Promise((resolve)=>{
            server.close(()=>{
                resolve();
            });
        });
    });
});
