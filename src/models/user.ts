import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, IsEmail, Length, Default } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

export interface UserCreationAttributes {
  email: string;
  username: string;
  password: string;
  role?: string; 
  tier?: string; 
  isVerified?: boolean; 
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email!: string;

  @Unique
  @Length({ min: 3, max: 20 })
  @Column(DataType.STRING)
  username!: string;

  @Column(DataType.STRING)
  password!: string;

  @Default('user')
  @Column(DataType.STRING)
  role!: string;

  @Default('free')
  @Column(DataType.STRING)
  tier!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async validatePassword(storedPassword: string, inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}

export default User;
