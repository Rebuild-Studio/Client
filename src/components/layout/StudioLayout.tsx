import { useState } from "react";
import { observer } from "mobx-react";
import { OrientationHelper } from "@/three_components/common/OrientationHelper";
import { CanvasLeftPanel } from "./CanvasLeftPanel/CanvasLeftPanel";
import TopBar from "../TopBar";
import RightPanel from "../common/RightPanel/RightPanel";

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
