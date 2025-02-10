'use client';

import Link from 'next/link';

export const Header = () => {
  return (
    <header className='flex justify-between bg-orange-50 px-6 pb-8 pt-8'>
      <Link href='/' className='flex items-center focus:outline-primary gap-x-2'>
        <img src='/icon.png' alt='Remove People From Photos' className='h-8 sm:h-12 w-fit flex-shrink-0' />
        <h1 className='text-2xl text-primary sm:text-3xl font-semibold'>Remove People From Photos</h1>
      </Link>
    </header>
  );
};
