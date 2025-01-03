"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = fetchData;
const axios_1 = __importDefault(require("axios")); // Import axios for making HTTP requests
// Define the function with an explicit return type of Promise<any>
async function fetchData(url) {
    try {
        // Fetch data from the external API
        const response = await axios_1.default.get(url); // Using axios to fetch data
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
}
