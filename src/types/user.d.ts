import { Optional } from 'sequelize';

// Define the User model attributes
export interface UserAttributes {
    id: string;
    email: string;
    password: string;
    username: string;
    role: string;
    firstName: string;
    lastName: string;
}

// Define the User creation attributes (excluding 'id')
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
    firstName: string;
    lastName: string;
}
