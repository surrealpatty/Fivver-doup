// src/test/auth.test.ts
import { Express } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';

// Use require instead of dynamic import for src/index.ts
const app = require('../src/index').app;

// Your test logic...
