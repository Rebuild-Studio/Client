import { styled } from "styled-components";

type Props = {};

const StyledBar = styled.button<Props>`
  height: 38px;
  width: 100%;
  background-color: rgb(16, 23, 40);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuBar = (props: Props) => {
  return <StyledBar></StyledBar>;
};

export default MenuBar;
