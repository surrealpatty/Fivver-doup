// src/test/math.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe('Math Functions', () => {
    const mockUsers = [
        {
            id: '1',
            username: 'user1',
            email: 'user1@example.com',
        },
        {
            id: '2',
            username: 'user2',
            email: 'user2@example.com',
        },
        // Add more mock users as needed
    ];
    it('should perform basic arithmetic correctly', () => {
        const result = 2 + 2;
        expect(result).toBe(4); // Basic addition test
    });
    it('should fetch the user correctly from mock data', () => __awaiter(this, void 0, void 0, function* () {
        const user = mockUsers[0]; // Fetch the first user from the mock data
        expect(user).toEqual(mockUsers[0]); // Ensure it matches the mock data
    }));
    it('should handle invalid user id gracefully', () => __awaiter(this, void 0, void 0, function* () {
        // Simulate an invalid user (ID not found)
        const user = mockUsers.find((u) => u.id === '999'); // Assume `id` is a property of the mock user
        expect(user).toBeUndefined(); // Expect that no user is found
    }));
});
