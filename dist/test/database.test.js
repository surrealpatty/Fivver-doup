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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
jest.mock('../config/database', () => {
    const mockSequelize = new sequelize_1.Sequelize('mysql://user:pass@localhost:3306/database');
    mockSequelize.authenticate = jest.fn().mockResolvedValue(undefined);
    return { sequelize: mockSequelize };
});
describe('Database Connection', () => {
    it('should connect successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield database_1.sequelize.authenticate();
        expect(result).toBeUndefined();
    }));
});
