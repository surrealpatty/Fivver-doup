"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Category = require('../models/category'); // Adjust path as necessary
// 1. Create a Category
exports.createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    // Input validation (ensuring the name is provided)
    if (!name) {
        return res.status(400).json({ error: 'Category name is required.' });
    }
    try {
        const newCategory = yield Category.create({ name });
        return res.status(201).json({ message: 'Category created successfully', category: newCategory });
    }
    catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ message: 'Error creating category', error: error.message });
    }
});
// 2. Read Categories
exports.getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.findAll(); // Fetch all categories
        return res.status(200).json(categories); // Respond with the fetched categories
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
});
// 3. Update a Category
exports.updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get category ID from request parameters
    const { name } = req.body;
    // Input validation
    if (!name) {
        return res.status(400).json({ error: 'Category name is required for update.' });
    }
    try {
        const category = yield Category.findByPk(id); // Find the category by ID
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Update the category with the new data
        yield category.update({ name });
        return res.status(200).json({ message: 'Category updated successfully', category });
    }
    catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ message: 'Error updating category', error: error.message });
    }
});
// 4. Delete a Category
exports.deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get category ID from request parameters
    try {
        const category = yield Category.findByPk(id); // Find the category by ID
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        yield category.destroy(); // Delete the category
        return res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
});
//# sourceMappingURL=categoryController.js.map