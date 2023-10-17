import { useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import assetCategoryStore from "@store/assetCategoryStore";
import assetLibraryStore from "@store/assetLibraryStore";
import { basicColors } from "@resources/colors/colors";
import Body from "./body";
import Footer from "./footer";
import Header from "./header";
import { useFetchLibraryAssets } from "../hooks/useFetchLibraryAssets query";

const AssetLibrary = observer(() => {
  const { currentPage } = assetLibraryStore;
  const { currentDomain, currentMainCategory, currentSubCategory } =
    assetCategoryStore;
  const { data, refetch } = useFetchLibraryAssets({
    domain: currentDomain.domain,
    majorCategories: currentMainCategory.category,
    minorCategories: currentSubCategory.category,
    page: currentPage,
  });

  useEffect(() => {
    data &&
      assetLibraryStore.setLibraryAssets([
        ...assetLibraryStore.libraryAssets,
        ...data,
      ]); //response 타입과 LibraryAsset타입간 매핑 어떻게?
  }, [data]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    return () => {
      assetLibraryStore.initLibrary();
    };
  }, []);

  return (
    <Container>
      <Header title="라이브러리" />
      <Body />
      <Footer />
    </Container>
  );
});

export default AssetLibrary;

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
