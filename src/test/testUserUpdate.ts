import  User  from '../models/user'; // Adjust the path to your User model

const testUpdateUser = async (userId: number) => {
  try {
    const updatedUser = await User.update(
      { username: 'updatedusername' },  // New value for the username
      { where: { id: userId } }         // Adjust according to your primary key or identifier
    );
    console.log('User updated:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Replace 1 with an actual user ID from your database
testUpdateUser(1);
