import { User } from '../models/user'; // Adjust the path to your User model

const testDuplicateUsername = async () => {
  try {
    // First user creation with all required properties
    const user1 = await User.create({
      username: 'duplicateuser',  // Test username
      email: 'user1@example.com',
      password: 'password1',
      role: 'user',  // Assuming 'user' is the default role
      tier: "free",  // Default tier should be "free"
      isVerified: false,  // Assuming the default value for verification is false
    });
    console.log('First user created:', user1);

    // Attempt to create another user with the same username
    const user2 = await User.create({
      username: 'duplicateuser',  // Same username as the first user
      email: 'user2@example.com',
      password: 'password2',
      role: 'user',  // Same role
      tier: "free",  // Default tier should be "free"
      isVerified: false,  // Same verification status
    });
    console.log('Second user created:', user2);
  } catch (error) {
    console.error('Error creating user (duplicate username):', error);
  }
};

testDuplicateUsername();
