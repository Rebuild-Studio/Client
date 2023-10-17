import { observer } from "mobx-react";
import useControlSelectedItem from "@/features/assetLibrary/hooks/useControlSelectedItem";
import { LibraryAsset } from "@/features/assetLibrary/types/fetchAssetType";
import { Card } from "@components/common/Card";
import getMinioPath from "@utils/path/minio";

interface Props {
  asset: LibraryAsset;
}

const GridItem = observer(({ asset }: Props) => {
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
});

export default GridItem;
