"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUserToken = void 0;
const createMockUserToken = (userId) => {
    const payload = { id: userId };
    const secretKey = 'your-secret-key';
    const token = Buffer.from(JSON.stringify(payload)).toString('base64') + '.' + Buffer.from(secretKey).toString('base64');
    return token;
};
exports.createMockUserToken = createMockUserToken;
