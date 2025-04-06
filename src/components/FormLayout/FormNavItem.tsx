import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  ListItemIcon,
  ListItemText,
  ListItemButton as MuiListItemButton,
} from '@mui/material';
import { LabelValue } from 'form';
import { memo } from 'react';
export interface FormNavItemProps {
  id: string;
  children?: React.ReactNode;
  section: LabelValue;
}
const getHash = () =>
  typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';

const FormNavItem = memo((props: FormNavItemProps) => {
  const { id, children } = props;
  const { currentSection, onSelectSection } = useFormLayout();
  const isSelected = currentSection === id;
  const onClick = () => {
    onSelectSection?.(id, true);
  };
  return (
    <MuiListItemButton
      selected={isSelected}
      sx={{ px: 2.5, py: 1.5 }}
      onClick={onClick}
    >
      {isSelected && (
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
      )}
      <ListItemText
        primary={children}
        primaryTypographyProps={{
          fontWeight: isSelected ? 600 : 400,
        }}
      />
    </MuiListItemButton>
  );
});
FormNavItem.displayName = 'FormNavItem';
export default FormNavItem;
