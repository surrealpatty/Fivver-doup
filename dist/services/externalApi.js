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
exports.fetchData = fetchData;
const axios_1 = __importDefault(require("axios")); // Import axios for making HTTP requests
// Define the function with an explicit return type of Promise<any>
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch data from the external API
            const response = yield axios_1.default.get(url); // Using axios to fetch data
            return response.data; // Return the data from the API response
        }
        catch (error) {
            // Handle errors and log appropriately
            if (error instanceof Error) {
                console.error('Error fetching data:', error.message);
            }
            else {
                console.error('Unknown error occurred');
            }
            throw error; // Optionally rethrow the error if you want to propagate it
        }
    });
}
