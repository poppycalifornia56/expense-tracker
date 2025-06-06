import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateExpenseRequest, UpdateExpenseRequest } from '../types';

const prisma = new PrismaClient();

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' },
      include: {
        category: true
      }
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true
      }
    });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, description, categoryId, date }: CreateExpenseRequest = req.body;
    
    if (!title || !amount || !categoryId) {
      return res.status(400).json({ error: 'Title, amount, and categoryId are required' });
    }
    
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId }
    });
    
    if (!categoryExists) {
      return res.status(400).json({ error: 'Category does not exist' });
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, amount, description, categoryId, date }: UpdateExpenseRequest = req.body;
    
    if (categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId }
      });
      
      if (!categoryExists) {
        return res.status(400).json({ error: 'Category does not exist' });
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
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.expense.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};