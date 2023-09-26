import styled from "styled-components";
import { basicColors, bgColors } from "@/resources/colors/colors";
import Header from "./header";
import Body from "./body";

const Container = styled.div`
  width: 100%;
  height: 80%;
  min-width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${bgColors["282828"]};
  overflow: hidden;
  border-radius: 10px;
  color: ${basicColors.white};
`;

const AssetLibrary = () => {
  return (
    <Container>
      <Header title="라이브러리" />
      <Body />
    </Container>
  );
};

export default AssetLibrary;
