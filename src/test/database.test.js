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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importStar(require("../config/database")); // Import sequelize as a default import
// Mock the sequelize instance's `authenticate` method to avoid real database calls during tests
jest.mock('../config/database', () => {
    const originalDatabase = jest.requireActual('../config/database');
    return Object.assign(Object.assign({}, originalDatabase), { sequelize: Object.assign(Object.assign({}, originalDatabase.sequelize), { authenticate: jest.fn() }) });
});
describe('Database Connection', () => {
    let mockAuthenticate;
    // Initialize the mock function for `authenticate`
    beforeAll(() => {
        mockAuthenticate = database_1.default.authenticate;
    });
    // Mock console methods globally
    let consoleLogSpy;
    let consoleErrorSpy;
    beforeEach(() => {
        // Mock `console.log` and `console.error` for test isolation
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        // Clear all mocks to reset state between tests
        jest.clearAllMocks();
    });
    afterAll(() => {
        // Restore original implementations of console methods
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
    // Test for a successful database connection
    it('should successfully connect to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate a successful connection
        mockAuthenticate.mockResolvedValueOnce(undefined);
        // Execute the `testConnection` function
        yield (0, database_1.testConnection)();
        // Assertions
        expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
        expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
        expect(consoleLogSpy).toHaveBeenCalledWith('Database connection has been established successfully.'); // Check success log
    }));
    // Test for a failed database connection
    it('should log an error when the database connection fails', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate a connection failure
        const errorMessage = 'Connection failed';
        mockAuthenticate.mockRejectedValueOnce(new Error(errorMessage));
        // Execute the `testConnection` function
        yield (0, database_1.testConnection)();
        // Assertions
        expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Check `authenticate` was called once
        expect(mockAuthenticate).toHaveBeenCalledWith(); // Ensure it was called without arguments
        expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', errorMessage); // Check error log
    }));
});
