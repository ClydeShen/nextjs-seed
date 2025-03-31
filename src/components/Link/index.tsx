import { Link as MuiLink, Stack, SxProps } from '@mui/material';
import { default as NextLink } from 'next/link';
import React, { useId } from 'react';

export interface RouterLink {
  href: URL | string;
  children: React.ReactNode | string;
  external?: boolean;
  custom?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | string;
  underline?: boolean;
  prefetch?: boolean;
  tabIndex?: number;
  bold?: boolean;
  scroll?: boolean;
  sx?: SxProps;
  disableGutters?: boolean;
  stopPropagation?: boolean;
  disabled?: boolean;
  id?: string;
  component?: React.ElementType;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
export const Link = (props: RouterLink) => {
  const {
    href,
    children,
    external,
    custom,
    startIcon,
    endIcon,
    prefetch,
    color,
    underline = false,
    tabIndex,
    bold,
    scroll,
    sx,
    disableGutters,
    stopPropagation,
    onClick,
    disabled,
    component,
    id,

    ...others
  } = props;
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  const _Id = useId();
  if (custom) {
    return (
      <NextLink
        id={id || _Id}
        href={href}
        passHref
        legacyBehavior
        prefetch={prefetch}
        tabIndex={disabled ? -1 : tabIndex}
        scroll={scroll}
        style={{
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        aria-disabled={disabled}
      >
        <MuiLink
          data-testid='test-anchor'
          underline={underline ? 'always' : 'none'}
          color='inherit'
          onClick={(e) => {
            stopPropagation && e.stopPropagation();
            onClick?.(e);
          }}
          tabIndex={disabled ? -1 : tabIndex}
          sx={{
            pointerEvents: disabled ? 'none' : 'auto',
          }}
          {...externalProps}
          {...others}
        >
          {children}
        </MuiLink>
      </NextLink>
    );
  }

  return (
    <Stack
      direction='row'
      spacing={0.5}
      alignItems='center'
      sx={{ px: disableGutters ? 0 : 1.5 }}
    >
      <MuiLink
        id={id || _Id}
        sx={{
          width: 'fit-content',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textDecoration: underline ? 'underline' : 'none',
          fontWeight: bold ? 600 : 'normal',
          pointerEvents: disabled ? 'none' : 'auto',
          ...sx,
        }}
        color={'text.primary'}
        variant='inherit'
        href={href}
        component={NextLink}
        prefetch={prefetch}
        tabIndex={disabled ? -1 : tabIndex}
        aria-disabled={disabled}
        onClick={(e) => {
          stopPropagation && e.stopPropagation();
          onClick?.(e);
        }}
        {...externalProps}
        {...others}
      >
        <Stack
          flexDirection='row'
          alignItems={'center'}
          spacing={2}
          component={component || 'div'}
        >
          {startIcon && React.cloneElement(startIcon, { fill: color })}
          {children}
          {endIcon && React.cloneElement(endIcon, { fill: color })}
        </Stack>
      </MuiLink>
    </Stack>
  );
};
