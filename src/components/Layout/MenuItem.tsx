'use client';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  useMediaQuery,
} from '@mui/material';

export interface MenuItemProps {
  active?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  open: boolean;
  path: string;
  label?: string;
  onClose?: () => void;
  access?: string[];
}

export const MenuItem = (props: MenuItemProps) => {
  const { active, icon, path, label, onClose, access } = props;
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const onClick = () => {
    onClose?.();
  };
  return (
    <ListItemButton
      data-testid='menu-item-route'
      selected={active}
      href={path}
      onClick={() => onClick()}
      sx={{
        minHeight: {
          xs: 68,
          sm: 48,
        },
        p: 0,
        '&.Mui-selected': {
          bgcolor: 'transparent',
          borderBottom: {
            xs: '2px solid',
            sm: 'none',
          },
          borderBottomColor: {
            xs: 'primary.main',
            sm: 'transparent',
          },
        },
      }}
      divider={smDown ? true : false}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: 1,
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>

      <ListItemText
        primary={label}
        primaryTypographyProps={{
          sx: {
            lineHeight: 1.5,
            letterSpacing: '-0.3px',
            ...(active && {
              fontWeight: 600,
            }),
          },
        }}
        sx={{
          flexGrow: {
            xs: 1,
            sm: 0,
          },

          ...(active && {
            borderBottom: {
              xs: 'none',
              sm: '2px solid',
            },
            borderBottomColor: {
              xs: 'transparent',
              sm: 'primary.main',
            },
          }),
        }}
      />
    </ListItemButton>
  );
};
