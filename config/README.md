# Configuration Files for Fiverr Clone

## Overview

This directory contains configuration files for different environments (development, production, testing) for the Fiverr clone project.

## Files

- `config.js`: Main configuration file that loads environment variables and exports the database configuration for the current environment.
- `development.js`: Configuration specific to the development environment.
- `production.js`: Configuration specific to the production environment.
- `test.js`: Configuration specific to the testing environment.
- `logging.js`: (Optional) Configuration for logging settings using Winston.
- `migrations/`: Directory for database migration files.
- `seeders/`: Directory for database seed files.

## Usage

1. Set environment variables in a `.env` file.
2. Choose the appropriate environment by setting `NODE_ENV` (development, production, or test).
3. Run migrations and seeders as needed.

