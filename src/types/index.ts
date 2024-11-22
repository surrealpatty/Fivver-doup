// IUserAttributes interface for model instances
export interface IUserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    isPaid: boolean;
  }
  
  // IUserCreationAttributes interface for user creation
  export interface IUserCreationAttributes extends Omit<IUserAttributes, 'id'> {
    // All attributes except 'id' are required for creation
  }
  