import { Model } from 'sequelize-typescript';
declare class User extends Model<User> {
  id: number;
  username: string;
  email: string;
}
export default User;
