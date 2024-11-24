import { Model } from 'sequelize-typescript';
export declare class Review extends Model {
    serviceId: string;
    userId: string;
    rating: number;
    comment: string;
}
export default Review;
