import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { useWindowSize } from '@hooks/useWindowSize';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material';
import { Fragment } from 'react';
import FormNavItem from './FormNavItem';
interface FormNavProps {
  children?: React.ReactNode;
}
const drawerWidth = 270;
export const FormNav = (props: FormNavProps) => {
  const { allExpanded, sectionExpanded, onToggleAllSections } = useFormLayout();
  const { height } = useWindowSize();
  const maxHeight = height - 420;

  const handleToggleAllSections = () => {
    onToggleAllSections?.();
  };
  return (
    <Stack id='form-nav' width={drawerWidth} spacing={2}>
      <Stack
        sx={{ position: 'sticky', top: 144, width: drawerWidth }}
        spacing={3}
      >
        <Stack component={Paper} variant='outlined'>
          <ListItemButton
            onClick={() => handleToggleAllSections()}
            sx={{ height: '64px' }}
          >
            <ListItemIcon>
              {allExpanded ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
            </ListItemIcon>
            <ListItemText
              primary={`Click to ${
                allExpanded ? 'collapse' : 'expand'
              } all sections`}
              primaryTypographyProps={{
                variant: 'h6',
                color: 'primary.dark',
              }}
            />
          </ListItemButton>
        </Stack>
        <Stack
          sx={{
            maxHeight: maxHeight,
            overflowY: 'auto',
          }}
          component={Paper}
          variant='outlined'
          divider={<Divider flexItem />}
        >
          {Object.entries(sectionExpanded)?.map(([value, { label }], i) => {
            return (
              <Fragment key={i}>
                <FormNavItem id={value} section={{ label, value }}>
                  {label}
                </FormNavItem>
              </Fragment>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
