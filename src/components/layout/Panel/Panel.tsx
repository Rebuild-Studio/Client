import { styled } from "styled-components";
import { bgColors } from "@resources/colors/colors";
import { fonts } from "@resources/fonts/font";

interface PanelProps {
  label: string;
  options: React.ReactNode;
  children: React.ReactNode;
}

const Panel = ({
  label = "",
  options = <></>,
  children = <></>
}: PanelProps) => {
  return (
    <PanelWrapper>
      <PanelTitleWrapper>{label}</PanelTitleWrapper>
      <PanelOptionsWrapper>{options}</PanelOptionsWrapper>
      <PanelContentWrapper>{children}</PanelContentWrapper>
    </PanelWrapper>
  );
};

export default Panel;

const PanelWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  background-color: ${bgColors[222222]};
  display: inline-block;
  z-index: 1;
  width: 271px;
  padding: 10px 0;
  position: relative;
`;

const PanelTitleWrapper = styled.div`
  padding: 0 10px;
  color: white;
  font-weight: 700;
  font-size: ${fonts.default};
  padding: 10px;
`;

const PanelOptionsWrapper = styled.div`
  display: flex;
  box-sizing: inherit;
  border-bottom: 2px solid ${bgColors[101728]};
  padding: 10px;
  color: white;
  overflow-x: hidden;
  width: 100%;
  flex-wrap: nowrap;

  & > * {
    flex: 0 0 auto;
    margin-right: 8px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

const PanelContentWrapper = styled.div`
  padding: 0 10px;
  box-sizing: inherit;
  color: white;
  font-size: ${fonts.small};
`;
