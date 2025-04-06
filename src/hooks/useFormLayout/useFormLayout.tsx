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
  allExpanded: boolean;
  bindFormNav?: (sectionId: LabelValue[], isExpanded?: boolean) => void;
  sectionExpanded: FormNavItem;
  currentSection: string;
  onToggleSection?: (id: string, isExpanded?: boolean) => void;
  onSelectSection?: (id: string, scrollToView?: boolean) => void;
  onToggleAllSections?: (expanded?: boolean) => void;
}
const FormLayoutContext = createContext<FormLayoutContextProps>({
  allExpanded: true,
  sectionExpanded: {},
  currentSection: '',
});

export const FormLayoutProvider = ({ children }: FormLayoutProviderProps) => {
  const [sectionExpanded, setSectionExpanded] = useState<FormNavItem>({});
  const [currentSection, setCurrentSection] = useState<string>('');
  const [allExpanded, setAllExpanded] = useState<boolean>(true);
  const onSelectSection = useCallback((id: string, scrollToView = false) => {
    setCurrentSection(id);
    scrollToView && scrollToSection(id);
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

  const onToggleAllSections = useCallback(() => {
    const _allExpanded = Object.values(sectionExpanded).every(
      (v) => v.isExpanded
    );
    setAllExpanded(!_allExpanded);
    setSectionExpanded((prev) => {
      const newState = prev as FormNavItem;
      for (const key in newState) {
        newState[key] = {
          ...newState[key],
          isExpanded: !_allExpanded,
        };
      }
      return newState;
    });
  }, [sectionExpanded]);
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
        allExpanded,
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
