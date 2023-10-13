import { useState } from "react";
import TopBar from "../TopBar";
import RightPanel from "../common/RightPanel/RightPanel";
import { observer } from "mobx-react";
import { OrientationHelper } from "@/three_components/common/OrientationHelper";
import { CanvasLeftPanel } from "./CanvasLeftPanel/CanvasLeftPanel";

const StudioLayout = observer(() => {
  const [barOpen, setBarOpen] = useState(false);

  return (
    <>
      <TopBar isOpen={barOpen} setOpen={setBarOpen} />
      <RightPanel isOpen={barOpen} />
      <OrientationHelper isOpen={barOpen} />
      <CanvasLeftPanel isOpen={barOpen} />
    </>
  );
});

export default StudioLayout;
