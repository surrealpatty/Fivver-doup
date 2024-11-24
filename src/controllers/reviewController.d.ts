import { Request, Response } from 'express';
export declare const createReview: (req: Request, res: Response) => Promise<void>;
export declare const getReviewsForService: (req: Request, res: Response) => Promise<void>;
export declare const updateReview: (req: Request, res: Response) => Promise<void>;
export declare const deleteReview: (req: Request, res: Response) => Promise<void>;
