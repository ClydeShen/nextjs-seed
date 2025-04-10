import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { useIntersectionObserver } from '@hooks/useIntersection';
import { Add, Remove } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { createActions, Func } from '@utils/helper';
import { Section } from 'form';
import { useEffect, useState } from 'react';

export interface FormCardProps extends Omit<Section, 'children'> {
  children?: React.ReactNode;
  tab?: boolean;
}

export const FormCard = (props: FormCardProps) => {
  const { children, id, title, actions, tab = false } = props;

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

  const addProduct = (config: string) => (params?: string) => {
    return {
      cardId: config,
      note: params,
    };
  };
  const readProduct = (config: string) => (params?: object) => {
    return {
      ...params,
      title: config,
    };
  };
  const actionFunctions: Record<string, Func> = {
    addProduct: addProduct(id),
    readProduct: readProduct(title as string),
  };
  const handleActions =
    (functions: string[]) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      try {
        const callTo = createActions(actionFunctions);
        const applyActions = callTo(functions);
        const result = await applyActions('description......');
      } catch (error) {}
    };

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
            {actions ? (
              <Stack>
                {actions.map((action, i) => (
                  <Button onClick={handleActions(action.functions as string[])}>
                    {action.label}
                  </Button>
                ))}
              </Stack>
            ) : (
              <Stack>
                {sectionExpanded[id]?.isExpanded ? <Remove /> : <Add />}
              </Stack>
            )}
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
function pipePromise(arg0: any[]) {
  throw new Error('Function not implemented.');
}
