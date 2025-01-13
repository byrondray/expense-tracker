import {
  allExpensesWithCategories,
  totalTransactionsValue,
} from '@/services/services';
import DeleteExpense from './delete-expense';
import DateSelector from './date-selector';

export default async function Expenses({ date }: { date?: string }) {
  const expenses = await allExpensesWithCategories(date);
  const totalExpenseValue = await totalTransactionsValue();
  return (
    <>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-2'>Expenses</h2>
        <DateSelector  />
        {expenses.map((expense) => (
          <div key={expense.expenses.id}>
            <div className='bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md mb-4 flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-bold'>
                  {expense.expenses.description}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {expense.expenses.date.toLocaleDateString()}
                </p>
              </div>
              <div className='flex gap-x-4 h-full items-center text-right'>
                <div>
                  <p className='text-lg font-bold'>
                    ${expense.expenses.amount}
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {expense.categories.name}
                  </p>
                </div>
                <DeleteExpense id={`${expense.expenses.id}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-2'>Total Expenses</h2>
        <p className='text-lg font-bold'>${totalExpenseValue[0].value}</p>
      </div>
    </>
  );
}
