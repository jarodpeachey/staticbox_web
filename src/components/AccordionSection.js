import React from 'react';
import styled from 'styled-components';

const AccordionSection = ({ children, onClick, open, label }) => {
  console.log(open);
  return (
    <AccordionWrapper>
      <AccordionTitle
        open={open}
        onClick={() => onClick(label)}
        style={{ cursor: 'pointer' }}
      >
        {label}
      </AccordionTitle>
      <AccordionBody open={open}>{children}</AccordionBody>
    </AccordionWrapper>
  );
};

const AccordionWrapper = styled.div`
  // padding: 0 16px;
`;

const AccordionBorderWrapper = styled.div``;

const AccordionTitle = styled.div`
  font-weight: ${(props) => (props.open ? 600 : 400)} !important;
  width: 100%;
  background: none;
  width: 100%;
  padding: 18px 16px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  :hover {
    background: #f7f7f7;
  }
`;

const AccordionBody = styled.div`
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  -ms-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
  overflow: hidden;
  max-height: ${(props) => (props.open ? '400px' : '0')} !important;
  padding: ${(props) => (props.open ? '0 16px' : '0px 16px')} !important;
  border-bottom: ${(props) => (props.open ? '1px solid #e8e8e8' : 'none')};
  height: 400px;
`;

export default AccordionSection;
