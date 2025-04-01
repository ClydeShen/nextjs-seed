import { Add, Remove } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export interface FormCardProps {
  children?: React.ReactNode;
  id: string;
  title?: string;
}
export const FormCard = (props: FormCardProps) => {
  const { children, id, title } = props;
  const [isExpanded, setIsExpended] = useState(false);
  const handleChange = () => {
    setIsExpended(!isExpanded);
  };
  return (
    <Stack id={id}>
      <Accordion
        variant='outlined'
        expanded={isExpanded}
        onChange={handleChange}
        sx={{
          '&.MuiPaper-root': {
            borderRadius: {
              xs: 0,
              md: 1,
            },
          },
        }}
      >
        <AccordionSummary>
          <Stack direction='row' justifyContent='space-between' width='100%'>
            <Typography variant='h2'>{title}</Typography>
            <Stack>{isExpanded ? <Remove /> : <Add />}</Stack>
          </Stack>
        </AccordionSummary>
        <Divider sx={{ mb: 3 }} />
        <AccordionDetails
          sx={{
            pt: 0,
            px: 2,
          }}
        >
          <Stack spacing={2} divider={<Divider flexItem />}>
            {children}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
