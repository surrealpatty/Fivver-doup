import { Router } from 'express';
import { loginUser, updateUser, deleteUser, registerUser } from '../controllers/userController';

const userRouter = Router();

// Register route
userRouter.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extract user details from the request body
    const newUser = await registerUser({ username, email, password }); // Call registerUser function
    res.status(201).json(newUser); // Respond with the new user object
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error', // Handle errors
    });
  }
});

// Login route
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body
    const user = await loginUser(email, password); // Call loginUser function
    res.status(200).json(user); // Respond with the logged-in user object
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error', // Handle errors
    });
  }
});

// Update user route
userRouter.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the route parameter
    const { username, email, password } = req.body; // Extract updated user details from the request body
    const updatedUser = await updateUser(id, { username, email, password }); // Call updateUser function
    res.status(200).json(updatedUser); // Respond with the updated user object
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error', // Handle errors
    });
  }
});

// Delete user route
userRouter.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the route parameter
    const deletedUser = await deleteUser(id); // Call deleteUser function
    res.status(200).json(deletedUser); // Respond with the deleted user object
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unknown error', // Handle errors
    });
  }
});

export default userRouter; // Export the user routes for use in other files
