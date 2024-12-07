"use strict";
// src/test/service.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Correct import of the helper function
var testHelpers_1 = require("./testHelpers");
describe('Service tests', function () {
    it('should mock a user token', function () {
        var userId = '12345'; // Example user ID
        var token = (0, testHelpers_1.createMockUserToken)(userId);
        console.log(token); // This is where you'd use the token in your test
        expect(token).toBeTruthy(); // Ensure token is truthy (i.e., not null or undefined)
    });
});
