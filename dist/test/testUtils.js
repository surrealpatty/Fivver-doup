"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = capitalizeFirstLetter;
// Example utility function that could be tested
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
describe('Test Utils', function () {
    test('capitalizeFirstLetter should capitalize the first letter of a string', function () {
        var result = capitalizeFirstLetter('hello');
        expect(result).toBe('Hello');
    });
    test('capitalizeFirstLetter should not change a string that already starts with an uppercase letter', function () {
        var result = capitalizeFirstLetter('Hello');
        expect(result).toBe('Hello');
    });
    test('capitalizeFirstLetter should return an empty string if input is empty', function () {
        var result = capitalizeFirstLetter('');
        expect(result).toBe('');
    });
});
