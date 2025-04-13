import { Divider, Paper, Stack, Tab, Tabs } from '@mui/material';
import { LabelValue, Layout } from 'form';
import { Fragment, useEffect, useState } from 'react';
import { DynamicFormCardSection } from './FormCardSection';

export interface FormTabsProps extends Layout {
  parent?: string;
}
export const FormTabs = (props: FormTabsProps) => {
  const { sections = [], parent } = props;
  // const { sectionExpanded, onSelectSection, currentSection } = useFormLayout();
  const [tabs, setTabs] = useState<LabelValue[]>();
  const [tab, setTab] = useState(sections?.[0]?.id);
  const handleChange = (_: React.SyntheticEvent, id: string) => {
    setTab?.(id);
  };

  useEffect(() => {
    setTabs(
      sections?.map((section, i) => {
        return {
          label: section.title || '',
          value: section.id || `${i}`,
        };
      })
    );
  }, [sections]);
  return (
    <Stack>
      <Stack
        component={Paper}
        elevation={0}
        square
        sx={{
          position: 'sticky',
          top: 125,
          zIndex: (theme) => theme.zIndex.appBar - 1,
          borderBottom: '1px solid',
          borderColor: 'freshLime.main',
        }}
      >
        <Tabs value={tab} onChange={handleChange}>
          {tabs?.map(({ label, value }, i) => {
            return <Tab key={value} label={label} value={value} />;
          })}
        </Tabs>
      </Stack>
      <Divider />
      <Stack>
        {sections?.map((section) => {
          return (
            <Fragment key={section.id}>
              {section.children.map((block, i) => {
                return (
                  <Fragment key={`${section.id}-${i}`}>
                    <Stack
                      sx={{
                        p: 2,
                        display: tab === section.id ? 'flex' : 'none',
                      }}
                    >
                      <DynamicFormCardSection {...block} parent={parent} />
                    </Stack>
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </Stack>
    </Stack>
  );
};
