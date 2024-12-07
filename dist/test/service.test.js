"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testHelpers_1 = require("./testHelpers");
describe('Service tests', () => {
    it('should mock a user token', () => {
        const userId = '12345';
        const token = (0, testHelpers_1.createMockUserToken)(userId);
        console.log(token);
        expect(token).toBeTruthy();
    });
});
