"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fetchData", {
    enumerable: true,
    get: function() {
        return fetchData;
    }
});
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Define the function with an explicit return type of Promise<any>
async function fetchData(url) {
    try {
        // Fetch data from the external API
        const response = await _axios.default.get(url); // Using axios to fetch data
        return response.data; // Return the data from the API response
    } catch (error) {
        // Handle errors and log appropriately
        if (error instanceof Error) {
            console.error('Error fetching data:', error.message);
        } else {
            console.error('Unknown error occurred');
        }
        throw error; // Optionally rethrow the error if you want to propagate it
    }
}
 // Export the fetchData function for use elsewhere

//# sourceMappingURL=externalApi.js.map