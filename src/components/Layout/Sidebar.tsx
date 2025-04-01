import { routes } from '@config/router.config';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DrawerProps,
  IconButton,
  Drawer as MuiDrawer,
  Paper,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { Theme, styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { drawerWidth } from '@utils/constants';
import Image from 'next/image';
import { forwardRef } from 'react';
import { Menu } from './Menu';
import { SidebarFooter } from './SidebarFooter';
interface SidebarProps extends DrawerProps {
  open: boolean;
  onClose: () => void;
}

interface SlideTransitionProps extends TransitionProps {
  children: React.ReactElement;
}
const Transition = forwardRef<HTMLDivElement, SlideTransitionProps>(
  (props: SlideTransitionProps, ref: React.Ref<unknown>) => {
    return <Slide direction='right' ref={ref} {...props} />;
  }
);
Transition.displayName = 'Transition';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 0, 0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Sidebar = (props: SidebarProps) => {
  const { open = false, onClose } = props;
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  if (smDown)
    return (
      <Dialog
        data-testid='testSidebarDialog'
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        PaperProps={{
          component: 'nav',
          role: 'navigation',
          'aria-label': 'main navigation',
          sx: {
            bgcolor: 'clear.main',
            pt: 0,
            px: 2.5,
          },
        }}
        sx={{
          width: open ? '100%' : 0,
        }}
      >
        <DrawerHeader>
          <Stack alignItems='center'>
            <Image
              src={'/next.svg'}
              alt='logo'
              width={240}
              height={40}
              sizes='(max-width: 600px) 100vw, 200px'
              priority
            />
          </Stack>
          <IconButton
            onClick={onClose}
            aria-label='close navigation from smdown sidebar'
            title='close navigation'
            sx={{
              bgcolor: (theme) => theme.palette.text.secondary,
              color: 'white',
              '&:hover': {
                bgcolor: (theme) => theme.palette.text.primary,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        <Stack flexGrow={1}>
          <Menu routes={routes} onClose={onClose} />
        </Stack>

        <SidebarFooter />
      </Dialog>
    );
  return (
    <MuiDrawer
      data-testid='testSidebarDrawer'
      variant={lgDown ? 'temporary' : 'persistent'}
      anchor='left'
      open={open}
      onClose={onClose}
      // hideBackdrop
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
      }}
      PaperProps={{
        component: 'nav',
        role: 'navigation',
        'aria-label': 'main navigation',
        sx: {
          bgcolor: 'transparent',
          width: drawerWidth + 23,
          border: 'none',
          boxShadow: 'none',
        },
      }}
    >
      <Paper
        sx={{ width: drawerWidth, px: 2.5 }}
        component={Stack}
        flexGrow={1}
        elevation={0}
        square
      >
        <DrawerHeader>
          <Image
            src={'/next.svg'}
            alt='logo'
            width={200}
            height={40}
            sizes='(max-width: 600px) 100vw, 200px'
            priority
          />
        </DrawerHeader>
        <IconButton
          sx={{
            position: 'absolute',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            top: '85px',
            left: '222px',
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'white',
            },
            border: '6px solid',
            p: 0.5,
            borderColor: {
              xs: 'rgba(0, 0, 0, 0.5)',
              lg: 'background.default',
            },
          }}
          aria-label='close navigation'
          title='close navigation'
          id='closeButton'
          onClick={onClose}
        >
          <ArrowBackIcon fontSize='small' />
        </IconButton>
        <Stack flexGrow={1} sx={{ position: 'relative' }}>
          <Menu routes={routes} onClose={lgDown ? onClose : undefined} />
        </Stack>
        <SidebarFooter />
      </Paper>
    </MuiDrawer>
  );
};
