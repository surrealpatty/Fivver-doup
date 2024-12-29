import { sequelize } from './config/database';  // Relative import
import {userRouter} from './routes/user';         // Relative import

console.log(sequelize);
console.log(userRouter);
