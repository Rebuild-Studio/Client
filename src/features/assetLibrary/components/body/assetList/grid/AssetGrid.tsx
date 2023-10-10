import { styled } from "styled-components";
import GridItem from "./GridItem";
import assetLibraryStore from "@/store/assetLibraryStore";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import infiniteScroll from "@/utils/infiniteScroll/infiniteScroll";
import setThrottle from "@/utils/throttle/throttle";

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

const AssetGrid = observer(() => {
  const { libraryAssets, currentPage } = assetLibraryStore;
  const [page, setPage] = useState(currentPage);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = setThrottle(() => {
      return infiniteScroll(containerRef, page, setPage, 400);
    }, 100);
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, page]);

  useEffect(() => {
    assetLibraryStore.setCurrentPage(page);
  }, [page]);

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
