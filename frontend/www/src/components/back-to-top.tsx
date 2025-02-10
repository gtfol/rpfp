'use client';

import { scrollToTop } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className='fixed bottom-8 right-8 z-40 shadow-2xl'
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={scrollToTop}
        className='flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-zinc-800 shadow-lg transition-all duration-300 hover:brightness-95'
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
            clipRule='evenodd'
          />
        </svg>
        <span className='ml-2'>back to top</span>
      </button>
    </motion.div>
  );
};
