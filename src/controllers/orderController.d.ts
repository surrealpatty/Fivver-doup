import { Request, Response } from 'express';
/**
 * CREATE: Add a new order
 */
export declare const createOrder: (req: Request, res: Response) => Promise<Response>;
/**
 * READ: Get all orders
 */
export declare const getAllOrders: (_req: Request, res: Response) => Promise<Response>;
/**
 * READ: Get a specific order by ID
 */
export declare const getOrderById: (req: Request, res: Response) => Promise<Response>;
/**
 * UPDATE: Update an existing order
 */
export declare const updateOrder: (req: Request, res: Response) => Promise<Response>;
/**
 * DELETE: Delete an order
 */
export declare const deleteOrder: (req: Request, res: Response) => Promise<Response>;
