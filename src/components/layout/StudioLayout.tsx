import { useState } from "react";
import { observer } from "mobx-react";
import TopBar from "../TopBar";
import RightPanel from "../common/RightPanel/RightPanel";
import { OrientationHelper } from "@/three_components/common/OrientationHelper";
import { CanvasLeftPanel } from "./CanvasLeftPanel/CanvasLeftPanel";

const StudioLayout = observer(() => {
  const [barOpen, setBarOpen] = useState(true);

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
