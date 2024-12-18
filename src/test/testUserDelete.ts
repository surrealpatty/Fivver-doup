import  User  from '../models/user'; // Adjust the path if necessary

const testDeleteUser = async (userId: number) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: userId },  // Replace with your identifier (primary key)
    });
    if (deletedUser) {
      console.log(`User with ID ${userId} deleted successfully.`);
    } else {
      console.log(`No user found with ID ${userId}.`);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// Replace with a valid user ID
testDeleteUser(1);
