import { Container, Stack } from '@mui/material';

export interface PageProps {
  children?: React.ReactNode;
}
export const Page = (props: PageProps) => {
  return (
    <Container
      component={Stack}
      flexGrow={1}
      sx={{
        bgcolor: 'background.default',
      }}
    >
      {props.children}
    </Container>
  );
};
