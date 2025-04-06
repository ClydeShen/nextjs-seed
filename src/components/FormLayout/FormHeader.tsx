import { Button, Paper, Stack, Typography } from '@mui/material';

export interface FormHeaderProps {
  title?: string;
}

export const FormHeader = (props: FormHeaderProps) => {
  const { title } = props;
  return (
    <Stack
      component={Paper}
      sx={{
        position: 'sticky',
        top: {
          xs: 112,
          md: 64,
        },
        zIndex: (theme) => theme.zIndex.appBar,
        borderBottom: '1px solid',
        borderColor: 'freshLime.main',
      }}
      square
      variant='elevation'
      elevation={0}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          px: 4,
          py: 0.5,
        }}
      >
        <Stack>
          <Typography variant='h3'>{title}</Typography>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Typography>Certificate</Typography>
            <Typography variant='body2'>123</Typography>
          </Stack>
        </Stack>
        <Stack direction='row'>
          <Button type={'submit'} variant='contained'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
