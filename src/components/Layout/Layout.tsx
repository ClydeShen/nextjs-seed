'use client';
import { Stack, Theme, Toolbar, styled, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export interface LayoutProps {
  children: React.ReactNode;
}
const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
}));
const minutes = 60;
export const Layout = ({ children }: LayoutProps) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [open, setOpen] = useState(() => false);
  const mountRef = useRef(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (mountRef.current === false) {
      lgUp ? setOpen(true) : setOpen(false);
    }
    mountRef.current = true;
  }, [lgUp]);

  return (
    <Stack
      direction={'row'}
      flexGrow={1}
      id='layout'
      component={'main'}
      role='main'
    >
      <TopNavbar color='primary' open={open} onOpen={handleDrawerOpen} />
      <Sidebar open={open} onClose={handleDrawerClose} />
      <Main key={'main-wapper-key'} id='main-wapper' open={open}>
        <Toolbar />
        {mdDown && (
          <Toolbar
            data-testid='testToolbarMdDown'
            sx={{
              minHeight: {
                xs: 48,
              },
            }}
          />
        )}
        {children}
      </Main>
    </Stack>
  );
};
