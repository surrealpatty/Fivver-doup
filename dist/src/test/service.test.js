// src/test/service.test.ts
// Correct import of the helper function
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testHelpers = require("./testHelpers");
describe('Service tests', ()=>{
    it('should mock a user token', ()=>{
        const userId = '12345'; // Example user ID
        const token = (0, _testHelpers.createMockUserToken)(userId);
        console.log(token); // This is where you'd use the token in your test
        expect(token).toBeTruthy(); // Ensure token is truthy (i.e., not null or undefined)
    });
});

//# sourceMappingURL=service.test.js.map