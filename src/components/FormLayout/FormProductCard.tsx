import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { useIntersectionObserver } from '@hooks/useIntersection';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';

export interface Product {
  _productName?: string;
  _productQuantity?: number;
  _productUnitPrice?: number;
  _productTotalPrice?: number;
}

export interface FormProductCardProps {
  children?: React.ReactNode;
  product?: Record<'id', Product>;
  index?: number;
}
export const FormProductCard = (props: FormProductCardProps) => {
  const { children, product } = props;
  const { sectionExpanded, currentSection, onToggleSection, onSelectSection } =
    useFormLayout();
  const id = product?.id as string;
  const { _productName } = product as Product;
  const { ref } = useIntersectionObserver({
    rootMargin: '-140px 0px -80% 0px',
    threshold: 0.5,
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
  }, [sectionExpanded[id]?.isExpanded, id]);
  return (
    <Accordion
      variant='outlined'
      disableGutters
      expanded={expanded}
      square
      onChange={handleChange}
    >
      <Stack
        ref={ref}
        flexDirection='row'
        sx={{
          bgcolor: "'mojito.main'", //isExpanded ? 'mojito.main' : 'background.paper',
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon />}
          sx={{
            width: '100%',
            flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper': {
              transform: 'rotate(-90deg)',
            },
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(0deg)',
            },
            '& .MuiAccordionSummary-content': {
              ml: 1,
            },
          }}
        >
          {_productName}
        </AccordionSummary>
        <Stack sx={{ mx: 1.5 }} justifyContent='center'>
          <MoreVertIcon></MoreVertIcon>
        </Stack>
      </Stack>
      <AccordionDetails sx={{ p: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};
