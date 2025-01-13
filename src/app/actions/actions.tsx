'use server';

import { deleteExpense, insertExpense } from '@/services/services';
import { v4 as uuid } from 'uuid';

export async function SubmitExpenseHandler({
  date,
  description,
  amount,
  categoryId,
}: {
  date: Date;
  description: string;
  amount: number;
  categoryId: string;
}) {
  try {
    if (description.length < 3) {
      throw new Error('The description must be at least 3 characters long');
    }

    const stringAmount = amount.toString();
    await insertExpense({
      date,
      description,
      amount: stringAmount,
      categoryId,
      id: uuid(),
    });

    return null;
  } catch (error) {
    return error;
  }
}

export async function DeleteExpenseHandler({ id }: { id: string }) {
  try {
    await deleteExpense(id);
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
