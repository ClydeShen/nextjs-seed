'use client';

import { Button, Stack } from '@mui/material';
// import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SigninButton = () => {
  const search = useSearchParams();
  const handleSignin = async () => {
    const callbackUrl = (search.get('callbackUrl') as string) || '/';
    // await signIn('cognito', {
    //   callbackUrl,
    // });
  };
  return (
    <Button onClick={handleSignin} size='large' fullWidth variant='contained'>
      Login
    </Button>
  );
};

const SigninPage = () => {
  return (
    <Stack
      sx={{ width: '100%' }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Suspense
        fallback={
          <Button size='large' fullWidth variant='contained'>
            Login
          </Button>
        }
      >
        <SigninButton />
      </Suspense>
    </Stack>
  );
};
export default SigninPage;
