"use strict";
const Category = require('../models/category'); // Adjust path as necessary
// 1. Create a Category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await Category.create({ name });
        return res.status(201).json(newCategory); // Respond with the created category
    }
    catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};
// 2. Read Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll(); // Fetch all categories
        return res.status(200).json(categories); // Respond with the fetched categories
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};
// 3. Update a Category
exports.updateCategory = async (req, res) => {
    const { id } = req.params; // Get category ID from request parameters
    const { name } = req.body;
    try {
        const category = await Category.findByPk(id); // Find the category by ID
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Update the category with the new data
        await category.update({ name });
        return res.status(200).json(category); // Respond with the updated category
    }
    catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};
// 4. Delete a Category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params; // Get category ID from request parameters
    try {
        const category = await Category.findByPk(id); // Find the category by ID
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await category.destroy(); // Delete the category
        return res.status(200).json({ message: 'Category deleted successfully' }); // Respond with success message
    }
    catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};
