import styled from "styled-components";
import { basicColors } from "@/resources/colors/colors";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  min-width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${basicColors.black};
  border-radius: 10px;
  color: ${basicColors.white};
  box-sizing: border-box;
`;

const AssetLibrary = () => {
  return (
    <Container>
      <Header title="라이브러리" />
      <Body />
      <Footer />
    </Container>
  );
};

export default AssetLibrary;
