"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../config/database");
const appPath = path_1.default.resolve(__dirname, '../../dist/index');
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.sync();
    try {
        const module = yield Promise.resolve(`${appPath}`).then(s => __importStar(require(s)));
        app = module.default || module.app;
    }
    catch (error) {
        console.error('Error loading app from dist:', error);
        throw error;
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.close();
}));
describe('Basic Test Suite', () => {
    it('should respond with a message from the root endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!app) {
            console.warn('Skipping tests as app could not be loaded');
            return;
        }
        const response = yield (0, supertest_1.default)(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to Fiverr Clone!');
    }));
});
