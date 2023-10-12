import useControlSelectedItem from "@/features/assetLibrary/hooks/useControlSelectedItem";
import { LibraryAsset } from "@/features/assetLibrary/types/fetchAssetType";
import { basicColors, grayColors } from "@/resources/colors/colors";
import styled from "styled-components";

const DeselectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  height: 100%;

  padding: 0px 8px;
  margin: 0 1px;
  box-sizing: border-box;

  border: 1px solid ${grayColors.panelGray};
  border-radius: 5px;

  color: ${basicColors.white};
  background-color: ${basicColors.black};

  font-weight: 600;

  white-space: nowrap;
`;

const CloseIcon = () => <img src="/icons/common/Close.svg" alt="close" />;

interface Props {
  asset: LibraryAsset;
}

const SelectedAsset = ({ asset }: Props) => {
  const [, updateSelectedAsset] = useControlSelectedItem(asset);
  return (
    <DeselectButton onClick={updateSelectedAsset}>
      <span>{asset.name}</span>
      <CloseIcon />
    </DeselectButton>
  );
};

export default SelectedAsset;
