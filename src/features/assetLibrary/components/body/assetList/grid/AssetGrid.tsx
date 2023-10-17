import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import assetLibraryStore from "@store/assetLibraryStore";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import GridItem from "./GridItem";

const AssetGrid = observer(() => {
  const { libraryAssets, currentPage } = assetLibraryStore;
  const [page, setPage] = useState(currentPage);
  const containerRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll(containerRef, currentPage, page, setPage);

  useEffect(() => {
    assetLibraryStore.setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    if (currentPage === 1) {
      setPage(1);
    }
  }, [currentPage]);

  useEffect(() => {
    return () => {
      assetLibraryStore.initLibrary();
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <Grid>
        {libraryAssets.map((asset, index) => (
          <GridItem key={index} asset={asset} />
        ))}
      </Grid>
    </Container>
  );
});

export default AssetGrid;

const Container = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
`;

const Grid = styled.div`
  padding: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
