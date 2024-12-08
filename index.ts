import express from 'express';
import { userRouter } from '@routes/user';  // Correct import for userRouter

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Ensure Express is set to parse JSON
app.use('/api/users', userRouter);  // Mount the router correctly

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { app };
