// Correctly import server as a named import from index.ts
import { server } from './index'; // Update this path to ensure it points to the correct location
export default async function globalTeardown() {
    // Close the server if it has a close method
    if (server && typeof server.close === 'function') {
        await server.close(); // Close the server properly after tests
        console.log('Server closed.');
    }
}
