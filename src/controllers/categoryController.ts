import { Request, Response } from 'express';
import Category from category'../models/category'; // Adjust path as necessary

// 1. Create a Category
export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body;

  // Input validation (ensuring the name is provided)
  if (!name) {
    return res.status(400).json({ error: 'Category name is required.' });
  }

  try {
    const newCategory = await Category.create({ name });
    return res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// 2. Read Categories
export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Category.findAll(); // Fetch all categories
    return res.status(200).json(categories); // Respond with the fetched categories
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

// 3. Update a Category
export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params; // Get category ID from request parameters
  const { name } = req.body;

  // Input validation
  if (!name) {
    return res.status(400).json({ error: 'Category name is required for update.' });
  }

  try {
    const category = await Category.findByPk(id); // Find the category by ID
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the category with the new data
    await category.update({ name });
    return res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// 4. Delete a Category
export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params; // Get category ID from request parameters

  try {
    const category = await Category.findByPk(id); // Find the category by ID
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy(); // Delete the category
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
