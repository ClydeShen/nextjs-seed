import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

const SignoutPage = () => {
  return (
    <Stack
      sx={{ width: '100%' }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Typography variant='h2'>You have been signed out</Typography>
      <Link href='/signin'>Sign in again</Link>
    </Stack>
  );
};

export default SignoutPage;
