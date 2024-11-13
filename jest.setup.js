// Mock sessionStorage methods using jest.spyOn instead of redefining sessionStorage
const mockStorage = require('mock-local-storage');

beforeAll(() => {
  // Mock sessionStorage methods only, without redefining the whole global sessionStorage
  jest.spyOn(global, 'sessionStorage', 'get').mockImplementation(mockStorage.getItem);
  jest.spyOn(global, 'sessionStorage', 'set').mockImplementation(mockStorage.setItem);
  jest.spyOn(global, 'sessionStorage', 'removeItem').mockImplementation(mockStorage.removeItem);
  jest.spyOn(global, 'sessionStorage', 'clear').mockImplementation(mockStorage.clear);
});

afterAll(() => {
  // Clean up mock after all tests
  jest.restoreAllMocks();
});
