'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function DateSelector({
  searchParams,
}: {
  searchParams?: { date?: string };
}) {
  const router = useRouter();

  const queryDateString = searchParams?.date;
  const initialDateValue = queryDateString
    ? new Date(queryDateString)
    : new Date();

  const initialDateRef = useRef(initialDateValue);

  const [date, setDate] = useState(initialDateRef.current);

  useEffect(() => {
    if (date.getTime() !== initialDateRef.current.getTime()) {
      const params = new URLSearchParams(searchParams ? searchParams : {});
      params.set('date', date.toISOString().split('T')[0]);
      router.replace(`?${params.toString()}`);
    }
  }, [date, searchParams]);

  return (
    <div className='mb-6'>
      <input
        type='date'
        value={date instanceof Date ? date.toISOString().split('T')[0] : ''}
        onChange={(e) => setDate(new Date(e.target.value))}
        className='mt-1 block w-full py-2 px-3 border-none bg-gray-100 dark:bg-gray-900 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900 dark:focus:bg-blue-900 focus:ring-0'
      />
    </div>
  );
}
