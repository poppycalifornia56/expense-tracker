"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseController_1 = require("../controllers/expenseController");
const router = (0, express_1.Router)();
router.get('/', expenseController_1.getAllExpenses);
router.get('/:id', expenseController_1.getExpenseById);
router.post('/', expenseController_1.createExpense);
router.put('/:id', expenseController_1.updateExpense);
router.delete('/:id', expenseController_1.deleteExpense);
exports.default = router;
//# sourceMappingURL=expenses.js.map