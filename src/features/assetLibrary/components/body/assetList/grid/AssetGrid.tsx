import { FetchAssetType } from "@/features/assetLibrary/types/fetchAssetType";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import GridItem from "./GridItem";

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

const AssetGrid = () => {
  const [assets, setAssets] = useState<FetchAssetType[]>([]);
  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("/mock/assetLibraryList.json");
      const assets = await res.json();
      setAssets(assets);
    };
    fetchAssets();
  }, []);

  return (
    <Container>
      <Grid>
        {assets.map((asset, index) => (
          <GridItem key={index} asset={asset} />
        ))}
      </Grid>
    </Container>
  );
};

export default AssetGrid;
