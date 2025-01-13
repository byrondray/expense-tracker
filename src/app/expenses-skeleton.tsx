export default function ExpensesSkeleton() {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-2'>Expenses</h2>
        {skeletonItems.map((_, index) => (
          <div key={index} className='mb-4'>
            <div className='bg-gray-200 dark:bg-gray-700 p-4 rounded-xl shadow-md animate-pulse flex justify-between items-center'>
              <div>
                <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2'></div>
                <div className='h-3 bg-gray-300 dark:bg-gray-600 rounded w-24'></div>
              </div>
              <div className='flex gap-x-4 h-full items-center text-right'>
                <div>
                  <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2'></div>
                  <div className='h-3 bg-gray-300 dark:bg-gray-600 rounded w-20'></div>
                </div>
                <div className='h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-2'>Total Expenses</h2>
        <div className='h-6 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse'></div>
      </div>
    </>
  );
}
