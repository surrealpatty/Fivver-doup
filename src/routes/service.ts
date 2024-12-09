import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import Service from '@models/services';  // Ensure this import is correct
import { body, validationResult } from 'express-validator';
import authenticateToken from '@middlewares/authenticateToken';  // Ensure this import is correct

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Set upload directory
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // Set unique file name
});

// Define file type and size validation
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false); // Reject non-image files
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (e.g., 5MB)
});

// Update service route (with image upload)
router.put(
  '/update/:serviceId',
  authenticateToken,  // Protect route
  upload.single('image'),  // Handle image upload
  [
    body('name').isLength({ min: 3 }).withMessage('Service name is required'),
    body('description').isLength({ min: 5 }).withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a valid number'),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });  // Return validation errors
      return;
    }

    const { name, description, price } = req.body;
    const { serviceId } = req.params;
    const userId = req.user?.id;  // Extract user id from the token

    try {
      // Find the service by ID and check if it belongs to the user
      const service = await Service.findOne({ where: { id: serviceId } });
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      // Ensure the logged-in user owns the service
      if (service.userId !== Number(userId)) {
        res.status(403).json({ message: 'You are not authorized to update this service' });
        return;
      }

      // Update the service details
      service.name = name;
      service.description = description;
      service.price = price;

      // Check if an image was uploaded and update the service image path
      if (req.file) {
        service.image = req.file.path; // Assuming you want to store the image path in the database
      }

      await service.save();

      res.status(200).json({ message: 'Service updated successfully', service });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Delete service route
router.delete(
  '/delete/:serviceId',
  authenticateToken,  // Protect route
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { serviceId } = req.params;
    const userId = req.user?.id;  // Extract user id from the token

    try {
      // Find the service by ID and check if it belongs to the user
      const service = await Service.findOne({ where: { id: serviceId } });
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      // Ensure the logged-in user owns the service
      if (service.userId !== Number(userId)) {
        res.status(403).json({ message: 'You are not authorized to delete this service' });
        return;
      }

      // Delete the service
      await service.destroy();

      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;
