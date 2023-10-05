import { Card } from "@/components/common/Card";
import { LibraryAsset } from "@/features/assetLibrary/types/fetchAssetType";
import getMinioPath from "@/utils/path/minio";
import { observer } from "mobx-react";
import { useState } from "react";

interface Props {
  asset: LibraryAsset;
}

const GridItem = observer(({ asset }: Props) => {
  const thumbnail = getMinioPath(asset.fileName, "libraryThumbnail");
  const [clicked] = useState(false);
  return (
    <div>
      <Card
        width="100%"
        height="100%"
        border="none"
        isClicked={clicked}
        thumbnail={thumbnail}
      ></Card>
    </div>
  );
});

export default GridItem;
