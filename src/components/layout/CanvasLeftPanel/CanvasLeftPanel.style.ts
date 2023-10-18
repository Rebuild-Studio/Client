import { basicColors, bgColors } from "@/resources/colors/colors";
import { fonts } from "@/resources/fonts/font";
import { styled } from "styled-components";

const StyledPanel = styled.div`
  width: 285px;
  height: 100%;
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
