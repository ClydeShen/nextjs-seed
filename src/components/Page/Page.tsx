'use client';
import {
  Container,
  ContainerProps,
  Paper,
  PaperProps,
  Stack,
  StackProps,
} from '@mui/material';
import { Fragment } from 'react';
export interface PageProps extends PaperProps {
  children?: React.ReactNode;
  ContainerProps?: ContainerProps & StackProps;
  spacing?: number;
  fluid?: boolean;
}

export const Page = (props: PageProps) => {
  const {
    children,
    ContainerProps,
    spacing = 2.5, //default spacing
    sx,
    fluid,
    ...paperProps
  } = props;

  return (
    <Fragment>
      <Paper
        data-testid='appPage'
        id='appPage'
        elevation={0}
        square
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          bgcolor: 'background.default',
          ...sx,
        }}
        {...paperProps}
      >
        <Container
          id='page-container'
          component={Stack}
          maxWidth={fluid ? false : 'xl'}
          disableGutters
          spacing={spacing}
          {...ContainerProps}
          sx={{
            m: 'auto',
            display: 'flex',
            flexGrow: 1,
            ...ContainerProps?.sx,
          }}
        >
          {children}
        </Container>
      </Paper>
    </Fragment>
  );
};
