"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { expenses: true }
                }
            }
        });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
            include: {
                expenses: {
                    orderBy: { date: 'desc' }
                }
            }
        });
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }
        const category = await prisma.category.create({
            data: {
                name,
                description
            }
        });
        res.status(201).json(category);
    }
    catch (error) {
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Category name already exists' });
            return;
        }
        res.status(500).json({ error: 'Failed to create category' });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(description !== undefined && { description })
            }
        });
        res.json(category);
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Category name already exists' });
            return;
        }
        res.status(500).json({ error: 'Failed to update category' });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map