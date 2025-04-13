'use client';
import { Card } from '@components/Card';
import { Link } from '@components/Link';
import { Page, PageHeader } from '@components/Page';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Grid, Stack } from '@mui/material';
const Home = () => {
  const onClick = async () => {};
  return (
    <Page>
      <PageHeader title='Kia ora' description='Welcome to Awesome App' />
      <Stack useFlexGap>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              title='Start list form'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              color='primary'
              actions={
                <Stack spacing={1.5}>
                  <Link href='/list-form' disableGutters prefetch>
                    <Button
                      variant='contained'
                      aria-label='Start list form'
                      endIcon={<ArrowForwardIcon aria-hidden='true' />}
                    >
                      Start list form
                    </Button>
                  </Link>
                </Stack>
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              title='Tab form'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              color='primary'
              actions={
                <Stack spacing={1.5}>
                  <Link href='/tab-form' disableGutters prefetch>
                    <Button
                      variant='contained'
                      aria-label='Start list form'
                      endIcon={<ArrowForwardIcon aria-hidden='true' />}
                    >
                      Start tab form
                    </Button>
                  </Link>
                </Stack>
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              title='Product form'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              color='primary'
              actions={
                <Stack spacing={1.5}>
                  <Link href='/product-form' disableGutters prefetch>
                    <Button
                      variant='contained'
                      aria-label='Product form'
                      endIcon={<ArrowForwardIcon aria-hidden='true' />}
                    >
                      learn more
                    </Button>
                  </Link>
                </Stack>
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </Page>
  );
};
export default Home;
