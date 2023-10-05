import { styled } from "styled-components";
import GridItem from "./GridItem";
import assetLibraryStore from "@/store/assetLibraryStore";
import { observer } from "mobx-react";

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
  const { libraryAssets } = assetLibraryStore;
  return (
    <Container>
      <Grid>
        {libraryAssets.map((asset, index) => (
          <GridItem key={index} asset={asset} />
        ))}
      </Grid>
    </Container>
  );
});

export default AssetGrid;
