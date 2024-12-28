// Load environment variables from the .env.test file
require('dotenv').config({ path: '.env.test' });

// Optional: Log environment variables to verify they are loaded correctly
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

// You can also set up other test configurations here if needed
