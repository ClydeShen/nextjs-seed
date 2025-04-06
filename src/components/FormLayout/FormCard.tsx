import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { useIntersectionObserver } from '@hooks/useIntersection';
import { Add, Remove } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export interface FormCardProps {
  children?: React.ReactNode;
  id: string;
  title?: string;
  tab?: boolean;
}

export const FormCard = (props: FormCardProps) => {
  const { children, id, title, tab = false } = props;
  const { sectionExpanded, currentSection, onToggleSection, onSelectSection } =
    useFormLayout();
  const { ref } = useIntersectionObserver({
    rootMargin: '-20% 0px',
    threshold: 0.4,
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        onSelectSection?.(id);
      }
    },
  });
  const [expanded, setExpanded] = useState(true);
  const handleChange = () => {
    onToggleSection?.(id);
  };
  useEffect(() => {
    setExpanded(!!sectionExpanded[id]?.isExpanded);
  }, [sectionExpanded[id]?.isExpanded]);
  return (
    <Stack
      id={id}
      sx={{
        scrollMarginTop: tab ? 250 : 144,
        display: tab && currentSection !== id ? 'none' : 'flex',
      }}
      role='navigation'
      flex={1}
    >
      <Accordion
        variant='outlined'
        expanded={expanded}
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
            <Stack>
              {sectionExpanded[id]?.isExpanded ? <Remove /> : <Add />}
            </Stack>
          </Stack>
        </AccordionSummary>
        <Divider sx={{ mb: 3 }} />
        <AccordionDetails
          sx={{
            pt: 0,
            px: 2,
          }}
        >
          <Stack ref={ref} spacing={2} divider={<Divider flexItem />}>
            {children}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
