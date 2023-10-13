import assetLibraryStore from "@/store/assetLibraryStore";
import SelectedAsset from "./SelectedAsset";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useRef } from "react";

const Container = styled.div`
  width: 65%;
  max-width: 65vw;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;

  box-sizing: border-box;

  gap: 8px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SelectedAssetsControl = observer(() => {
  const selectedAssets = assetLibraryStore.selectedAssets;
  const ref = useRef<HTMLDivElement>(null);

  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <Container ref={ref} onWheel={handleWheelScroll}>
      {selectedAssets.map((selectedAsset) => (
        <SelectedAsset key={selectedAsset.id} asset={selectedAsset} />
      ))}
    </Container>
  );
});

export default SelectedAssetsControl;
