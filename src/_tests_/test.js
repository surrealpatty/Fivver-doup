// Example mock data
const mockUsers = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Example test
describe('Mock Data', () => {
  test('mockUsers should contain two users', () => {
      // Check if mockUsers array has two users
      expect(mockUsers.length).toBe(2);
  });

  test('mockUsers should have the correct username for user1', () => {
      // Check if the first user has the expected username
      expect(mockUsers[0].username).toBe('user1');
  });

  test('mockUsers should have the correct password for user2', () => {
      // Check if the second user has the expected password
      expect(mockUsers[1].password).toBe('password2');
  });
});
