import { numeric, sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { categories } from './category';

export const expenses = sqliteTable('expenses', {
  id: text('id').primaryKey(),
  amount: numeric('amount').notNull(),
  description: text('description').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
});

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;
