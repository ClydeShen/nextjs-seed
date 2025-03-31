'use client';
import { Logout, NotificationsNoneOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { drawerWidth } from '@utils/constants';
import Image from 'next/image';
export interface TopNavbarProps {
  color: 'primary' | 'default';
  open: boolean;
  onOpen: () => void;
}
interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}
const DesktopAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export const TopNavbar = (props: TopNavbarProps) => {
  const { color, open, onOpen } = props;
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const AppBar = lgDown ? MuiAppBar : DesktopAppBar;
  return (
    <>
      <AppBar position='fixed' open={open} color={color} elevation={0}>
        {mdDown && (
          <Toolbar
            sx={{
              bgcolor: 'white',
            }}
          >
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='space-between'
              width='100%'
            >
              <Box>
                <Image
                  src={'/next.svg'}
                  alt='mpi-logo'
                  width={140}
                  height={35}
                  sizes='(max-width: 600px) 100vw, 140px'
                  priority
                />
              </Box>
              <Stack direction='row' spacing={1}>
                <IconButton
                  color='inherit'
                  aria-label='notifications button'
                  title='notifications button'
                  onClick={() => {}}
                  size='small'
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },
                  }}
                >
                  <NotificationsNoneOutlined />
                </IconButton>
                <IconButton
                  data-testid='testNavigationMenuMobile'
                  color='inherit'
                  aria-label='open drawer'
                  title='open navigation'
                  onClick={onOpen}
                  size='small'
                >
                  <MenuIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Toolbar>
        )}
        <Toolbar
          sx={{
            minHeight: {
              xs: 48,
              md: 64,
            },
          }}
        >
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent='space-between'
            width='100%'
          >
            <Stack direction='row' spacing={1} alignItems='center'>
              {!mdDown && (
                <IconButton
                  data-testid='testNavigationForNonMobile'
                  color='inherit'
                  aria-label='open navigation'
                  title='open navigation'
                  onClick={onOpen}
                  edge='start'
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant='h2'
                sx={{
                  fontFamily: 'var(--font-din-semi-cond)',
                }}
              >
                Super Awsome App
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              {!mdDown && (
                <IconButton
                  test-data='testLogoutButton'
                  onClick={async () => {}}
                  title={`Logout`}
                  tabIndex={0}
                >
                  <Logout />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <AppBar
        position='fixed'
        component={'div'}
        open={open}
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
      >
        {mdDown && <Toolbar />}
        <Toolbar
          sx={{
            minHeight: {
              xs: 48,
              md: 64,
            },
          }}
        />
      </AppBar>
    </>
  );
};
