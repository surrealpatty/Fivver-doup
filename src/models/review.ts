import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User }from './user';
import Service from './service';

// Define the Review model class
@Table({ tableName: 'reviews', timestamps: true })
class Review extends Model {
 
  @Column({ type: DataType.INTEGER, allowNull: false })
  serviceId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rating!: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  comment!: string;
}

// Define associations for the Review model
Review.belongsTo(User, { foreignKey: 'userId' });

export default Review;
