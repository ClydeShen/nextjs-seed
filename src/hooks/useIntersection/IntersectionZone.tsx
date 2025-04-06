import type { SxProps } from '@mui/material';
import { Stack } from '@mui/system';
export interface StackOwnProps {
  children?: React.ReactNode;
  sx?: SxProps;
}
export const IntersectionZone = (props: StackOwnProps) => {
  return (
    <Stack
      id='intersection-container'
      flex={1}
      sx={{
        // position: 'fixed',
        backgroundColor: 'red',
        height: '50vh',
        // width: '100%',
        padding: 2,
      }}
    >
      {props.children}
    </Stack>
  );
};
