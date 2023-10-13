import { useState } from "react";
import TopBar from "../TopBar";
import RightPanel from "../common/RightPanel/RightPanel";
import { observer } from "mobx-react";

const StudioLayout = observer(() => {
  const [barOpen, setBarOpen] = useState(true);

  return (
    <>
      <TopBar isOpen={barOpen} setOpen={setBarOpen} />
      <RightPanel isOpen={barOpen} />
    </>
  );
});

export default StudioLayout;
