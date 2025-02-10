'use client';

import Link from 'next/link';

export const Header = () => {
  return (
    <header className='mb-8 flex justify-between bg-white px-8 pb-8 pt-8'>
      <Link href='/' className='flex items-center focus:outline-zinc-200'>
        <h2 className='text-2xl text-zinc-900 sm:text-4xl'>Remove People From Photos</h2>
      </Link>
    </header>
  );
};
