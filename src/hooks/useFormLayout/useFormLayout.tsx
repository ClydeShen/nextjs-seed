'use client';
import { scrollToSection } from '@utils/helper';
import { LabelValue } from 'form';
import { isEmpty } from 'lodash';
import { createContext, useCallback, useContext, useState } from 'react';

export interface FormLayoutProviderProps {
  children?: React.ReactNode;
}
type SectionInView = { [key: string]: boolean };
type FormNavItem = {
  [key: string]: {
    label: string;
    isExpanded: boolean;
  };
};
interface FormLayoutContextProps {
  bindFormNav?: (sectionId: LabelValue[], isExpanded?: boolean) => void;
  sectionExpanded: FormNavItem;
  currentSection: string;
  onToggleSection?: (id: string, isExpanded?: boolean) => void;
  onSelectSection?: (id: string) => void;
  onToggleAllSections?: (expanded?: boolean) => void;
}
const FormLayoutContext = createContext<FormLayoutContextProps>({
  sectionExpanded: {},
  currentSection: '',
});

const getHash = () =>
  typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';

export const FormLayoutProvider = ({ children }: FormLayoutProviderProps) => {
  const [sectionExpanded, setSectionExpanded] = useState<FormNavItem>({});
  const [currentSection, setCurrentSection] = useState<string>('');
  const onSelectSection = useCallback((id: string) => {
    setCurrentSection(id);
    scrollToSection(id);
  }, []);
  const onToggleSection = useCallback((id: string, isExpanded?: boolean) => {
    setSectionExpanded((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isExpanded:
          isExpanded === undefined ? !prev[id]?.isExpanded : isExpanded,
      },
    }));
  }, []);

  const onToggleAllSections = useCallback(
    (expanded?: boolean) => {
      const allExpanded = Object.values(sectionExpanded).every((v) => v);
      setSectionExpanded((prev) => {
        const newState = prev as FormNavItem;
        for (const key in sectionExpanded) {
          newState[key] = {
            ...newState[key],
            isExpanded: expanded === undefined ? !allExpanded : expanded,
          };
        }
        return newState;
      });
    },
    [sectionExpanded]
  );
  const bindFormNav = useCallback(
    (sections: LabelValue[], isExpanded?: boolean) => {
      if (!sections) return;
      const expandedSections = {} as FormNavItem;
      for (let i = 0; i < sections.length; i++) {
        const id = sections[i].value;
        if (!isEmpty(sectionExpanded)) {
          if (!(id in sectionExpanded)) {
            expandedSections[id] = {
              label: sections[i].label,
              isExpanded: true,
            };
            continue;
          }
        }
        expandedSections[id] = {
          label: sections[i].label,
          isExpanded:
            isExpanded === undefined
              ? sectionExpanded[id]?.isExpanded
              : isExpanded,
        };
      }
      setSectionExpanded(expandedSections);
    },
    [sectionExpanded]
  );
  return (
    <FormLayoutContext.Provider
      value={{
        sectionExpanded,
        currentSection,
        onSelectSection,
        onToggleSection,
        onToggleAllSections,
        bindFormNav,
      }}
    >
      {children}
    </FormLayoutContext.Provider>
  );
};

export const useFormLayout = () => useContext(FormLayoutContext);
