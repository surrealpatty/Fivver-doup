"use strict";
// mockData.js
const mockUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];
const mockServices = [
    { name: 'Service 1', description: 'Description for service 1' },
    { name: 'Service 2', description: 'Description for service 2' },
];
// Exporting mock data
module.exports = { mockUsers, mockServices };
// Jest test block to ensure there is at least one test
describe('Mock Data', () => {
    test('mockUsers should have two users', () => {
        expect(mockUsers.length).toBe(2);
    });
    test('mockServices should have two services', () => {
        expect(mockServices.length).toBe(2);
    });
});
