import styled from "styled-components";
import { basicColors } from "@/resources/colors/colors";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useEffect } from "react";

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
  const [, isError] = useFetchAssets();
  useEffect(() => {
    isError && alert("에셋 로딩중 에러가 발생했습니다.");
  }, [isError]);

  return (
    <Container>
      <Header title="라이브러리" />
      <Body />
      <Footer />
    </Container>
  );
};

export default AssetLibrary;
