import { bgColors } from "@/resources/colors/colors";
import { styled } from "styled-components";

type Props = {
  children: React.ReactNode;
};

const StyledBar = styled.div<Props>`
  height: 38px;
  width: 100%;
  background-color: ${bgColors[101728]};
  display: flex;
  align-items: center;
`;

const MenuBar = (props: Props) => {
  return <StyledBar>{props.children}</StyledBar>;
};

export default MenuBar;
