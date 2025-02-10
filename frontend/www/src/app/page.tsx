'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Undo } from 'lucide-react';
import { useAuthContext } from '@/contexts/useAuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertCircle } from 'lucide-react';
import Authenticate from '@/components/authenticate';
import PayDialog from '@/components/pay-dialog';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/types/db';

const RemovePeopleApp = () => {
  const { user } = useAuthContext();
  const supabaseClient = createClient();

  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Tables<'profiles'> | null>(null);

  const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

  const getCurrentUser = async (userId: string) => {
    try {
      const { data: profile, error } = await supabaseClient.from('profiles').select('*').eq('id', userId);

      if (error) {
        throw error;
      }

      if (profile && profile.length > 0) {
        setCurrentUser(profile[0]);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const validateFile = (file: File) => {
    if (!file) {
      throw new Error('Please select an image file.');
    }

    if (!SUPPORTED_FORMATS.includes(file.type)) {
      throw new Error('Unsupported file format. Please use JPEG, PNG, or WebP.');
    }

    return true;
  };

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    setProcessedImage(null);

    try {
      validateFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.onerror = () => setError('Failed to read file.');
      reader.readAsDataURL(file);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const file = 'dataTransfer' in e ? e.dataTransfer?.files[0] : e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const processImage = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      setProgress(0);

      const response = await fetch('/api/remove-people', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const result = await response.json();
      setProcessedImage(result.url);
      setProgress(100);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getCurrentUser(user.id);
    }
  }, [user]);

  if (!user || !currentUser) {
    return <Authenticate />;
  }

  return (
    <div className='bg-orange-50 min-h-screen'>
      <div className='mx-auto max-w-4xl px-4 py-12'>
        <header className='mb-8 flex items-center justify-between'>
          <h1 className='text-4xl font-bold text-gray-900'>Remove People from Photos</h1>
          <div className='flex items-center gap-4'>
            <div className='hidden font-semibold md:block'>
              {currentUser.paid ? (
                <p className='text-sm'>High Resolution Export Available</p>
              ) : (
                <div className='flex items-center gap-2'>
                  <p className='text-sm'>Free - 720p Export</p>
                  <Button
                    variant='link'
                    className='h-auto p-0 text-sm text-primary hover:underline'
                    onClick={() => setIsPayDialogOpen(true)}
                  >
                    Upgrade for HD
                  </Button>
                </div>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={currentUser?.avatar_url || undefined} />
                  <AvatarFallback>RP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuLabel>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>{currentUser?.full_name}</p>
                    <p className='text-xs leading-none text-muted-foreground'>{user?.user_metadata.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsPayDialogOpen(true)}>
                  <button>{currentUser?.paid ? 'View Plan' : 'Upgrade to Pro'}</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {error && (
          <Alert variant='destructive' className='mb-4'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!image ? (
          <div
            className='rounded-lg border-2 border-dashed border-gray-300 p-12 text-center'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className='space-y-4'>
              <div className='flex justify-center'>
                <Upload className='h-12 w-12 text-gray-400' />
              </div>
              <div className='text-xl text-gray-700'>
                Drop your image here, or{' '}
                <label className='text-blue-600 hover:text-blue-700 cursor-pointer'>
                  browse
                  <input
                    ref={fileInputRef}
                    type='file'
                    className='hidden'
                    accept={SUPPORTED_FORMATS.join(',')}
                    onChange={handleDrop}
                  />
                </label>
              </div>
              <p className='text-gray-500'>Supported formats: JPEG, PNG, WebP</p>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='relative overflow-hidden rounded-lg bg-white p-4'>
                <h3 className='mb-2 text-lg font-medium'>Original</h3>
                <img src={image} alt='Original' className='h-64 w-full object-contain' />
              </div>

              <div className='relative overflow-hidden rounded-lg bg-white p-4'>
                <h3 className='mb-2 text-lg font-medium'>Result</h3>
                {processedImage ? (
                  <img src={processedImage} alt='Processed' className='h-64 w-full object-contain' />
                ) : (
                  <div className='flex h-64 items-center justify-center bg-gray-100'>
                    {isProcessing ? (
                      <div className='text-center'>
                        <div className='mx-auto mb-4 w-full max-w-xs'>
                          <div className='h-2 rounded bg-gray-200'>
                            <div
                              className='bg-blue-600 h-2 rounded transition-all duration-500'
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        <p className='text-gray-600'>Processing... {progress}%</p>
                      </div>
                    ) : (
                      <p className='text-gray-500'>Click process to remove people</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-center space-x-4'>
              {!processedImage && (
                <Button
                  onClick={processImage}
                  disabled={isProcessing}
                  className='bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 text-white disabled:bg-gray-400'
                >
                  {isProcessing ? 'Processing...' : 'Remove People'}
                </Button>
              )}
              <Button
                onClick={() => setImage(null)}
                className='rounded-lg bg-gray-200 px-6 py-3 text-gray-700 hover:bg-gray-300'
              >
                Upload New Image
              </Button>
              {processedImage && (
                <Button
                  onClick={() => {
                    const maxResolution = currentUser.paid ? 'original' : '720p';
                    const link = document.createElement('a');
                    const downloadUrl = new URL(processedImage);
                    downloadUrl.searchParams.set('resolution', maxResolution);
                    link.href = downloadUrl.toString();
                    link.download = 'processed-image.png';
                    link.click();
                  }}
                  className='bg-green-600 hover:bg-green-700 rounded-lg px-6 py-3 text-white'
                >
                  Download Result
                </Button>
              )}
            </div>
          </div>
        )}

        <div className='mt-12'>
          <h2 className='mb-4 text-2xl font-semibold text-gray-900'>How it works</h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className='rounded-lg bg-white p-6 shadow'>
              <Upload className='text-blue-600 mb-4 h-8 w-8' />
              <h3 className='mb-2 text-lg font-medium'>1. Upload Photo</h3>
              <p className='text-gray-600'>Upload your image or drag and drop it into the upload area</p>
            </div>
            <div className='rounded-lg bg-white p-6 shadow'>
              <ImageIcon className='text-blue-600 mb-4 h-8 w-8' />
              <h3 className='mb-2 text-lg font-medium'>2. AI Processing</h3>
              <p className='text-gray-600'>Our AI automatically detects and removes people from your photo</p>
            </div>
            <div className='rounded-lg bg-white p-6 shadow'>
              <Undo className='text-blue-600 mb-4 h-8 w-8' />
              <h3 className='mb-2 text-lg font-medium'>3. Download Result</h3>
              <p className='text-gray-600'>Download your processed image with people removed</p>
            </div>
          </div>
        </div>
      </div>
      <PayDialog
        userDetails={currentUser}
        userEmail={user.user_metadata.email}
        isOpen={isPayDialogOpen}
        onClose={() => setIsPayDialogOpen(false)}
      />
    </div>
  );
};

export default RemovePeopleApp;
