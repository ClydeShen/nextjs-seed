import { Logout } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LinkIcon from '@mui/icons-material/Link';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { Link } from '../Link';
interface SidebarFooterItemProps {
  dataTestId?: string;
  icon: React.ReactNode;
  label: string;
  title?: string;
  onClick?: () => void;
}
const SidebarFooterItem = (props: SidebarFooterItemProps) => {
  const { dataTestId, icon, label, title, onClick } = props;
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <ListItemButton
      data-testid={dataTestId}
      sx={{
        minHeight: {
          xs: 68,
          sm: 48,
        },
        p: 0,
      }}
      divider={smDown ? true : false}
      onClick={onClick}
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
        title={title}
        primary={label}
        primaryTypographyProps={{
          sx: {
            lineHeight: 2,
          },
        }}
        sx={{
          flexGrow: {
            xs: 1,
            sm: 0,
          },
        }}
      />
    </ListItemButton>
  );
};
export const SidebarFooter = () => {
  const [isOpenFeedbackModal, setOpenFeedbackModal] = useState(false);
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const handleOpenFeedbackModal = () => setOpenFeedbackModal(true);
  const handleCloseFeedbackModal = () => setOpenFeedbackModal(false);

  return (
    <List component={'div'}>
      <Link
        data-testid='testExternalLinkItem'
        href='https://www.google.com/'
        external
        custom
      >
        <SidebarFooterItem
          icon={<LinkIcon fontSize='small' />}
          label='google'
        />
      </Link>
      <SidebarFooterItem
        data-testid='testFeedbackItem'
        icon={<ThumbUpOffAltIcon fontSize='small' />}
        label='Give us feedback'
        onClick={handleOpenFeedbackModal}
      />
      <Link data-testid='testHelpLinkItem' href='' external custom>
        <SidebarFooterItem
          data-testid='testHelpItem'
          icon={<HelpOutlineIcon fontSize='small' />}
          label='Help'
        />
      </Link>
      {mdDown && (
        <SidebarFooterItem
          data-testid='testLogoutItemMd'
          icon={<Logout fontSize='small' />}
          label='Logout'
          onClick={() => signOut({ callbackUrl: logoutUrl })}
        />
      )}
    </List>
  );
};
