'use client';

export default function AuthError() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='p-8 text-center'>
        <h2 className='mb-2 text-2xl font-semibold text-red-600'>Authentication Error</h2>
        <p className='text-gray-600'>Sorry, something went wrong during authentication.</p>
      </div>
    </div>
  );
}
