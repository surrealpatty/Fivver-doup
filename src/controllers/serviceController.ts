// src/controllers/serviceController.ts
import { Request, Response } from 'express';
import  Service  from '../models/service'; // Named import of the Service model
import { User } from '../models/user'; // Named import of the User model

export const createService = async (req: Request, res: Response) => {
    try {
        const { title, description, price, userId } = req.body;
        const newService = await Service.create({
            title,
            description,
            price,
            userId
        });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
};
