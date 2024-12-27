import { initializeDatabase } from '../config/database';

beforeAll(async () => {
  await initializeDatabase();
});
