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
describe('API Root Route', ()=>{
    it('should return a 200 response with the correct message', async ()=>{
        // Send a GET request to the root endpoint
        const response = await (0, _supertest.default)(_index.default).get('/');
        // Assert the response status and message
        expect(response.status).toBe(200);
        expect(response.text).toBe('Welcome to Fiverr Clone!');
    });
});

//# sourceMappingURL=app.test.js.map