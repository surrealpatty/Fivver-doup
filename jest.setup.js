// jest.setup.js
import 'mock-local-storage';  // Import mock-local-storage to mock localStorage and sessionStorage

beforeAll(() => {
  // Mock sessionStorage methods using jest.spyOn and mock-local-storage
  jest.spyOn(global, 'sessionStorage', 'get').mockImplementation(global.localStorage.getItem);
  jest.spyOn(global, 'sessionStorage', 'set').mockImplementation(global.localStorage.setItem);
  jest.spyOn(global, 'sessionStorage', 'removeItem').mockImplementation(global.localStorage.removeItem);
  jest.spyOn(global, 'sessionStorage', 'clear').mockImplementation(global.localStorage.clear);
});

afterAll(() => {
  // Clean up the mocks after all tests are run
  jest.restoreAllMocks();
});
