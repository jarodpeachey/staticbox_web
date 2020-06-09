import React, { useState } from 'react';
import { styled } from 'styled-components';
import AccordionSection from './AccordionSection';

const Accordion = ({ children, card }) => {
  const [openSection, setOpenSection] = useState([]);
  const onClick = (label) => {
    if (openSection === label) {
      setOpenSection('');
    } else {
      setOpenSection(label);
    }

    console.log('On click: ', openSection);
  };

  return (
    <div>
      {children.map((child) => {
        if (child && child.props && child.props.label) {
          return (
            <AccordionSection
              open={openSection === child.props.label}
              label={child.props.label}
              onClick={onClick}
              card={card}
            >
              {child.props.children}
            </AccordionSection>
          );
        }
      })}
    </div>
  );
};

export default Accordion;
