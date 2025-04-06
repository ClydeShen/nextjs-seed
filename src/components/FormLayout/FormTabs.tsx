import { useFormLayout } from '@hooks/useFormLayout/useFormLayout';
import { Paper, Stack, Tab, Tabs } from '@mui/material';

export const FormTabs = () => {
  const { sectionExpanded, onSelectSection, currentSection } = useFormLayout();

  const handleChange = (_: React.SyntheticEvent, id: string) => {
    onSelectSection?.(id);
  };
  return (
    <Stack
      component={Paper}
      elevation={0}
      square
      sx={{
        position: 'sticky',
        top: 125,
        zIndex: (theme) => theme.zIndex.appBar,
        borderBottom: '1px solid',
        borderColor: 'freshLime.main',
      }}
    >
      <Tabs value={currentSection} onChange={handleChange}>
        {Object.entries(sectionExpanded)?.map(([value, { label }], i) => {
          return <Tab key={value} label={label} value={value} />;
        })}
      </Tabs>
    </Stack>
  );
};
