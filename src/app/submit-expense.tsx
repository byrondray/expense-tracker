'use client';

import { SelectCategory } from '@/db/schema/category';
import { useState } from 'react';
import { SubmitExpenseHandler } from '@/app/actions/actions';
import { useRouter } from 'next/navigation';

export default function SubmitExpense({
  categories,
}: {
  categories: SelectCategory[];
}) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  interface SubmitExpenseProps {
    amount: number;
    description: string;
    date: Date;
    categoryId: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const expenseData: SubmitExpenseProps = {
        amount,
        description,
        date,
        categoryId: selectedCategory,
      };
      await SubmitExpenseHandler(expenseData);

      setSelectedCategory(categories[0].id);
      setDate(new Date());
      setDescription('');
      setAmount(0);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Error adding expense: ${error.message}`);
      } else {
        setErrorMessage('Error adding expense: An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className='space-y-5' onSubmit={handleSubmit}>
        <div>
          <input
            type='date'
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            disabled={loading}
            className='mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0'
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0'
          >
            {categories.map((category) => (
              <>
                <option
                  value={category.id}
                >{`${category.name[0].toUpperCase()}${category.name.slice(
                  1
                )}`}</option>
              </>
            ))}
          </select>
        </div>
        <div>
          <input
            type='text'
            placeholder='Description'
            minLength={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className='mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0'
          />
        </div>
        <div>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder='Amount'
            disabled={loading}
            className='mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0'
          />
        </div>

        <button
          type='submit'
          className={
            'w-full bg-indigo-500 dark:bg-indigo-700 text-white p-3 rounded-xl shadow hover:bg-indigo-700 dark:hover:bg-indigo-800'
          }
          disabled={loading}
        >
          {loading ? 'Adding Expense...' : 'Add Expense'}
        </button>
        {errorMessage && <div className='text-red-700'>{errorMessage}</div>}
      </form>
    </div>
  );
}
