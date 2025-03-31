'use Client';
import type { Route } from '@config/router';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import { List } from '@mui/material';
import { usePathname } from 'next/navigation';
import { MenuItem } from './MenuItem';
const MenuIcons = Object.freeze({
  '/': <HomeOutlinedIcon fontSize='small' />,
  '/list-form': <ViewAgendaOutlinedIcon fontSize='small' />,
  '/tab-form': <ViewColumnOutlinedIcon fontSize='small' />,
});
interface ReduceChildRoutesProps {
  list: React.ReactNode[];
  item: Route;
  path: string;
  onClose?: () => void;
}
interface MenuProps {
  routes: readonly Route[];
  onClose?: () => void;
}
const reduceChildRoutes = ({
  list,
  item,
  path,
  onClose,
}: ReduceChildRoutesProps) => {
  const key = `${item.path}`;
  const partialMatch =
    path.substring(1).split('/', 2).includes(item.path.substring(1)) &&
    path.substring(1).split('/', 2).at(0) === item.path.split('/').at(1); // this will check if the first path is the same and check if all other subpaths are in the item.path
  const exactMatch = path === item.path;

  list.push(
    <MenuItem
      key={key}
      active={exactMatch || partialMatch}
      label={item.label}
      path={item.path}
      icon={MenuIcons[item.path as keyof typeof MenuIcons]}
      open={partialMatch}
      onClose={onClose}
    />
  );
  return list;
};
export const Menu = ({ routes, onClose }: MenuProps) => {
  const path = usePathname();
  return (
    <List component='div' data-testid='test-menu'>
      {routes.reduce(
        (list: React.ReactNode[], item: Route) =>
          reduceChildRoutes({ list, item, path, onClose }),
        []
      )}
    </List>
  );
};
