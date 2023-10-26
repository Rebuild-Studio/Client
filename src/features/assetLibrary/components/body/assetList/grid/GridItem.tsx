import { Card } from "@/components/common/Card";
import useControlSelectedItem from "@/features/assetLibrary/hooks/useControlSelectedItem";
import { LibraryAsset } from "@/features/assetLibrary/types/fetchAssetType";
import getMinioPath from "@/utils/path/minio";
import { observer } from "mobx-react";

interface Props {
  asset: LibraryAsset;
}

const GridItem = ({ asset }: Props) => {
  const thumbnail = getMinioPath(asset.fileName, "libraryThumbnail");
  const [clicked, updateSelectedAsset] = useControlSelectedItem(asset);

  return (
    <div>
      <Card
        width="100%"
        height="100%"
        border="none"
        isClicked={clicked}
        thumbnail={thumbnail}
        onClick={updateSelectedAsset}
      ></Card>
    </div>
  );
};

const Observer = observer(GridItem);
export default Observer;
