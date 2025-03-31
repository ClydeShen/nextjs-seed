import {
  Box,
  CardActions,
  CardContent,
  Paper,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import Image from 'next/image';

export interface InfoCardProps {
  children?: React.ReactNode;
  elevation?: number;
  variant?: 'outlined' | 'elevation';
  actions?: React.ReactNode;
  title?: string;
  description?: string;
  sx?: SxProps;
  image?: string;
  color?: 'primary' | 'default';
}
export const Card = (props: InfoCardProps) => {
  const {
    elevation = 0,
    variant = 'elevation',
    actions,
    title,
    description,
    color,
    image,
    sx,
  } = props;
  return (
    <Paper
      data-testid='testInfoCard'
      elevation={elevation}
      variant={variant}
      sx={{
        bgcolor: color === 'primary' ? 'freshLime.main' : 'white',
        display: 'flex',
        height: '100%',
        padding: {
          xs: 1,
          sm: 2,
        },
        ...sx,
      }}
    >
      <Stack flexGrow={1} sx={{ width: 'clamp(300px, 60%, 450px)' }}>
        <CardContent
          sx={{
            display: 'flex',
            flexGrow: 1,
            width: 'clamp(280px, 100%, 450px)',
          }}
        >
          <Stack spacing={2}>
            <Typography
              data-testid='testInfoCardTitle'
              variant='h2'
              sx={{
                borderBottom: '2px solid',
                borderBottomColor: 'primary.main',
                pb: 1,
                width: 'fit-content',
              }}
            >
              {title}
            </Typography>
            <Typography
              data-testid='testInfoCardDescription'
              variant='body1'
              gutterBottom
              sx={{
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </Stack>
        </CardContent>
        {actions && (
          <CardActions data-testid='testInfoCardActions'>{actions}</CardActions>
        )}
      </Stack>
      {image && (
        <Box
          sx={{
            maxHeight: 250,
            width: 250,
            display: {
              xs: 'none',
              sm: 'flex',
              md: 'none',
              lg: 'flex',
            },
            ml: 4,
            mr: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Image
            data-testid='testInfoCardImage'
            src={image}
            alt='info-card-image'
            fill
            sizes='(max-width: 600px) 300px, 250px'
            style={{ objectFit: 'contain' }}
          />
        </Box>
      )}
    </Paper>
  );
};
