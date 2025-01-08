import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, HasMany, AutoIncrement } from 'sequelize-typescript';
import { Service } from './services'; // Assuming you have a Service model

// Define the User model with Sequelize decorators
@Table({
  tableName: 'users', // Specify the table name
})
export class User extends Model<User> {
  // Declare the 'id' property to prevent overwriting Sequelize's base property
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number; // Use 'declare' to avoid overwriting the base property

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  role!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  tier!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.STRING)
  passwordResetToken!: string | null;

  @Column(DataType.DATE)
  passwordResetTokenExpiry!: Date | null;

  // Assuming you have a Service model related to User
  @HasMany(() => Service)
  services!: Service[];
}
