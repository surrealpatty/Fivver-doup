"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Example test for user creation
describe('User creation test', ()=>{
    it('should create a new user', async ()=>{
        const newUser = await _user.default.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            role: 'user',
            tier: "free",
            isVerified: false
        });
        // Check if the user was created successfully
        expect(newUser).toBeDefined();
        expect(newUser.username).toBe('testuser');
        expect(newUser.email).toBe('testuser@example.com');
    });
});

//# sourceMappingURL=testUserCreation.js.map