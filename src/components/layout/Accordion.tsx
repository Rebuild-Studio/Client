import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { basicColors, bgColors } from "@resources/colors/colors";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={toggleAccordion}>
        <Icon open={isOpen} />
        <Title>{title}</Title>
      </AccordionHeader>
      <AccordionContent isOpen={isOpen} maxHeight={isOpen ? contentHeight : 0}>
        <div ref={contentRef}>{children}</div>
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;

const AccordionContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
`;

const AccordionHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  cursor: pointer;
  background-color: none;
`;

const Icon = styled.div<{ open: boolean }>`
  min-width: 0;
  min-height: 0;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background-color: ${(props) =>
    props.open ? basicColors.primary : bgColors[282828]};
  border: ${(props) =>
    props.open
      ? `solid 2px ${bgColors[282828]}`
      : `solid 2px ${basicColors.primary}`};
`;

const Title = styled.span`
  margin-left: 9px;
  font-family: SpoqaHanSansNeo;
  font-size: 12px;
  font-weight: 500;
  color: ${basicColors.white};
  text-align: left;
`;

const AccordionContent = styled.div<{
  isOpen: boolean;
  maxHeight: number | null;
}>`
  overflow: hidden;
  max-height: ${(props) => props.maxHeight};
  transition: max-height 0.3s ease-in-out;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
`;
