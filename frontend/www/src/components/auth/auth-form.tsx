'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, signup } from './actions';

export default function AuthForm() {
  return (
    <div className='flex w-full max-w-md flex-col space-y-8 p-8'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
        <p className='text-sm text-muted-foreground'>Enter your email to sign in to your account</p>
      </div>
      <form className='flex flex-col space-y-4'>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' name='email' type='email' placeholder='m@example.com' required />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' name='password' type='password' required />
        </div>
        <div className='flex flex-col space-y-2'>
          <Button formAction={login} className='w-full'>
            Sign In
          </Button>
          <Button formAction={signup} variant='outline' className='w-full'>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
