'use client';
import { routes } from '@config/router.config';
import {
  Box,
  Breadcrumbs,
  Stack,
  Typography,
  TypographyProps,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Link } from '../Link';
export interface PageHeaderProps {
  title?: string;
  titleTypography?: TypographyProps;
  description?: string;
  descriptionTypography?: TypographyProps;
  disableGutters?: boolean;
  actions?: React.ReactNode;
}
export const PageHeader = (props: PageHeaderProps) => {
  const {
    title,
    titleTypography,
    description,
    descriptionTypography,
    disableGutters = false,
    actions,
  } = props;
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => {
    return routes
      .filter((item) => item.path !== '/')
      .find((item) => pathname !== '/' && item.pathname.test(pathname));
  }, [pathname]);
  return (
    <Stack>
      {breadcrumbs && (
        <Box sx={{ mb: 1.5, height: 22 }}>
          <Breadcrumbs aria-label='breadcrumb' data-testid='breadcrumb'>
            <Link href='/' disableGutters prefetch>
              <Typography variant='body1'>Home</Typography>
            </Link>
            <Typography variant='h6' color='text.primary' component={'b'}>
              {breadcrumbs.label}
            </Typography>
          </Breadcrumbs>
        </Box>
      )}
      {(title || actions) && (
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          columns={2}
        >
          <Grid>
            {title && (
              <Typography
                variant='h1'
                {...titleTypography}
                data-testid='page-title'
              >
                {title}
              </Typography>
            )}
          </Grid>
          <Grid>{actions}</Grid>
        </Grid>
      )}
      {description && (
        <Typography
          variant='h5'
          {...descriptionTypography}
          data-testid='page-description'
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
};
