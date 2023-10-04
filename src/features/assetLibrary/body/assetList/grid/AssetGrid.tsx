import { FetchAssetType } from "@/features/assetLibrary/types/fetchAssetType";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  overflow: scroll;
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

const GridItem = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
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
          <GridItem key={index}>
            <img
              src={`https://dev.mxstudio.app/storage/models/Objects/${asset.fileName}.png`}
            />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default AssetGrid;
