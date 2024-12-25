import { Sequelize } from 'sequelize';

// Define the database configuration for different environments (development, production, etc.)
const config: {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql';
    dialectOptions: {
      charset: string;
      ssl: boolean;
    };
    logging: boolean;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql';
    dialectOptions: {
      charset: string;
      ssl: boolean;
    };
    logging: boolean;
  };
  test: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql';
    dialectOptions: {
      charset: string;
      ssl: boolean;
    };
    logging: boolean;
  };
} = {
  development: {
    username: 'root',
    password: 'f0^:8t1#qaC7',
    database: 'fivver_doup',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: false,
  },
  production: {
    username: 'root',
    password: 'your_prod_password',
    database: 'fivver_doup',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: false,
  },
  test: {
    username: 'root',
    password: 'your_test_password',
    database: 'fivver_doup_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: false,
    },
    logging: false,
  },
};

// Explicitly define the type of the environment variable
type Environment = keyof typeof config; // 'development' | 'production' | 'test'

// Use environment variable (default to 'development')
const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';

// Access the appropriate config based on the environment
const currentConfig = config[environment];

// Create and export the Sequelize instance with the selected configuration
export const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    dialectOptions: currentConfig.dialectOptions,
    logging: currentConfig.logging,
  }
);

// Function to test the database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error instanceof Error ? error.message : error
    );
    return false;
  }
};
