"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.getExpenseById = exports.getAllExpenses = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: { date: 'desc' },
            include: {
                category: true
            }
        });
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};
exports.getAllExpenses = getAllExpenses;
const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await prisma.expense.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true
            }
        });
        if (!expense) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch expense' });
    }
};
exports.getExpenseById = getExpenseById;
const createExpense = async (req, res) => {
    try {
        const { title, amount, description, categoryId, date } = req.body;
        if (!title || !amount || !categoryId) {
            res.status(400).json({ error: 'Title, amount, and categoryId are required' });
            return;
        }
        const categoryExists = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        if (!categoryExists) {
            res.status(400).json({ error: 'Category does not exist' });
            return;
        }
        const expense = await prisma.expense.create({
            data: {
                title,
                amount,
                description,
                categoryId,
                date: date ? new Date(date) : new Date()
            },
            include: {
                category: true
            }
        });
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};
exports.createExpense = createExpense;
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, description, categoryId, date } = req.body;
        if (categoryId) {
            const categoryExists = await prisma.category.findUnique({
                where: { id: categoryId }
            });
            if (!categoryExists) {
                res.status(400).json({ error: 'Category does not exist' });
                return;
            }
        }
        const expense = await prisma.expense.update({
            where: { id: parseInt(id) },
            data: {
                ...(title && { title }),
                ...(amount !== undefined && { amount }),
                ...(description !== undefined && { description }),
                ...(categoryId && { categoryId }),
                ...(date && { date: new Date(date) })
            },
            include: {
                category: true
            }
        });
        res.json(expense);
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        res.status(500).json({ error: 'Failed to update expense' });
    }
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.expense.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};
exports.deleteExpense = deleteExpense;
//# sourceMappingURL=expenseController.js.map