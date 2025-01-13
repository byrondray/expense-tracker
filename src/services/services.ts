import { getDB } from '@/db/index';
import { categories } from '@/db/schema/category';
import { expenses, InsertExpense } from '@/db/schema/expense';
import { and, eq, gte, lt, sum } from 'drizzle-orm';

const db = getDB();

export const allExpensesWithCategories = async (date?: string) => {
  let result;

  if (!date) {
    result = await db
      .select()
      .from(expenses)
      .innerJoin(categories, eq(expenses.categoryId, categories.id));
  } else {
    const [year, month, day] = date.split('-');

    const startDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);

    result = await db
      .select()
      .from(expenses)
      .innerJoin(categories, eq(expenses.categoryId, categories.id))
      .where(and(gte(expenses.date, startDate), lt(expenses.date, endDate)));
  }

  return result;
};

export const allCategories = async () => {
  const result = await db.select().from(categories);

  console.log('Categories:', result);

  return result;
};

export const insertExpense = async (expense: InsertExpense) => {
  return await db.insert(expenses).values(expense).returning();
};

export const deleteExpense = async (id: string) => {
  await db.delete(expenses).where(eq(expenses.id, id));
};

export const totalTransactionsValue = async () => {
  return await db.select({ value: sum(expenses.amount) }).from(expenses);
};
