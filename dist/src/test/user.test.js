"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("src/models/user");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = /*#__PURE__*/ _interop_require_default(require("src/index"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mocking the User model's create method
jest.mock('src/models/user', ()=>({
        create: jest.fn()
    }));
describe('POST /api/users/register', ()=>{
    it('should register a user successfully', async ()=>{
        // Mock resolved value for the User.create method
        _user.User.create.mockResolvedValueOnce({
            id: '1',
            email: 'test@example.com',
            username: 'testuser'
        });
        // Send a POST request to the register endpoint
        const response = await (0, _supertest.default)(_index.default).post('/api/users/register').send({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        // Check if the response status is 201 (Created)
        expect(response.status).toBe(201);
        // Check if the response body contains the user id
        expect(response.body).toHaveProperty('id');
    });
});

//# sourceMappingURL=user.test.js.map