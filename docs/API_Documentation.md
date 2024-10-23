# Fiverr Clone API Documentation

## Introduction
Welcome to the Fiverr Clone API! This API allows you to create, manage, and interact with user accounts, services, and transactions similar to Fiverr.

## Base URL
`http://localhost:3000/api`

## Authentication
All requests must include a valid JWT token in the Authorization header.

## Endpoints

### Create User
- **Endpoint**: `POST /api/users`
- **Description**: Creates a new user account.
- **Request Body**:
    ```json
    {
      "username": "exampleUser",
      "email": "user@example.com",
      "password": "securePassword",
      "name": "Example User"
    }
    ```
- **Response**:
    - **Success (201)**:
        ```json
        {
          "message": "User created successfully",
          "userId": "12345"
        }
        ```
    - **Error (400)**:
        ```json
        {
          "error": "User already exists"
        }
        ```

## Error Handling
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Internal Server Error

## Examples
- **Creating a User**:
  ```bash
  curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"username":"exampleUser","email":"user@example.com","password":"securePassword","name":"Example User"}'
