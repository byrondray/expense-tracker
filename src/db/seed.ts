import { categories } from './schema/category';
import { expenses } from './schema/expense';
import { getDB } from './index';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import { SelectCategory } from './schema/category';

const db = getDB();

const categoriesList = [
  'food',
  'transport',
  'housing',
  'utilities',
  'entertainment',
];

const expensesList = [
  {
    amount: '10',
    description: 'Lunch',
    date: new Date('2021-01-01'),
    categoryId: 'food',
  },
  {
    amount: '20',
    description: 'Dinner',
    date: new Date('2021-01-01'),
    categoryId: 'food',
  },
  {
    amount: '5',
    description: 'Bus',
    date: new Date('2021-01-01'),
    categoryId: 'transport',
  },
];

const resultsCat: SelectCategory[][] = [];

(async () => {
  await db.delete(categories);

  for (const name of categoriesList) {
    const result = await db
      .insert(categories)
      .values({ id: uuid(), name })
      .returning();
    resultsCat.push(result);
  }

  const allCategories = resultsCat.flat();

  console.log('Inserted Categories:', allCategories);

  await db.delete(expenses);

  const results = [];
  for (const data of expensesList) {
    const randomCategory = faker.helpers.arrayElement(allCategories);

    const result = await db
      .insert(expenses)
      .values({
        id: uuid(),
        amount: data.amount,
        description: data.description,
        date: data.date,
        categoryId: randomCategory.id,
      })
      .returning();
    results.push(result);
  }

  console.log('Inserted Expenses:', await Promise.all(results));
})();
