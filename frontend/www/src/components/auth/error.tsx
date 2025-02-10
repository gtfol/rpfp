'use client';

export default function AuthError() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='p-8 text-center'>
        <h2 className='text-red-600 mb-2 text-2xl font-semibold'>Authentication Error</h2>
        <p className='text-gray-600'>Sorry, something went wrong during authentication.</p>
      </div>
    </div>
  );
}
