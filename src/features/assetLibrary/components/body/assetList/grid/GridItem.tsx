import { Card } from "@/components/common/Card";
import { FetchAssetType } from "@/features/assetLibrary/types/fetchAssetType";
import { useState } from "react";

interface Props {
  asset: FetchAssetType;
}

const GridItem = ({ asset }: Props) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <Card
        width="100%"
        height="100%"
        border="none"
        isClicked={clicked}
        thumbnail={`https://dev.mxstudio.app/storage/models/Objects/${asset.fileName}.png`}
      ></Card>
    </div>
  );
};

export default GridItem;
