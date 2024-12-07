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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const user_1 = require("../models/user");
const services_1 = __importDefault(require("../models/services"));
const testModels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync({ force: true });
        console.log('Database synced successfully.');
        const testUser = yield user_1.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'free',
        });
        console.log('Test User created:', testUser.toJSON());
        const testServiceData = {
            name: 'Test Service',
            title: 'Test Service Title',
            description: 'A description of the test service.',
            price: 99.99,
            userId: testUser.id,
        };
        const testService = yield services_1.default.create(testServiceData);
        console.log('Test Service created:', testService.toJSON());
    }
    catch (error) {
        console.error('Error testing models:', error);
    }
    finally {
        yield database_1.sequelize.close();
    }
});
exports.default = testModels;
testModels();
