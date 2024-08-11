'use client';
import { Page } from '@components/Page';
import { Button } from '@mui/material';
import Link from 'next/link';

const Home = () => {
  const onClick = async () => {};
  return (
    <Page>
      Start seed
      <Link href='/test'>test</Link>
      <Button onClick={onClick}>click</Button>
    </Page>
  );
};
export default Home;
