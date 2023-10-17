import { styled } from "styled-components";
import { basicColors, bgColors } from "@resources/colors/colors";
import { fonts } from "@resources/fonts/font";

const StyledPanel = styled.div`
  width: 285px;
  height: calc(100vh - 220px);
  background-color: ${bgColors[222222]};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const StyledHeader = styled.div`
  color: ${basicColors.white};
  padding: 18px;
  font-size: ${fonts.medium};
`;

const StyledTab = styled.div`
  color: ${basicColors.white};
  padding-right: 30px;
  padding-bottom: 20px;
`;

const StyledContent = styled.div``;

export { StyledPanel, StyledHeader, StyledTab, StyledContent };
