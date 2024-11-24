"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('supertest');
const { app } = require('../dist/index'); // Import 'app' as a named import from the compiled JS file
describe('Basic Test Suite', () => {
    // Test for ensuring the test file runs correctly
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true);
    });
    // Test to check if the root endpoint is responding correctly
    it('should respond with a message from the root endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get('/');
        expect(response.statusCode).toBe(200); // Check if status code is 200
        expect(response.text).toBe('Fiverr backend is running'); // Expect correct response message
    }));
});
